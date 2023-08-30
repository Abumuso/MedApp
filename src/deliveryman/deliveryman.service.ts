import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Deliveryman } from './models/deliveryman.model';
import { SignupDeliverymanDto } from './dto/signup-deliveryman.dto';
import { SigninDeliverymanDto } from './dto/signin-deliveryman.dto';
import { UpdateDeliverymanDto } from './dto/update-deliveryman.dto';

@Injectable()
export class DeliverymanService {
  constructor(
    @InjectModel(Deliveryman) private readonly deliverymanRepo: typeof Deliveryman,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async signup(signupDeliverymanDto: SignupDeliverymanDto, res: Response) {
    const deliveryman = await this.deliverymanRepo.findOne({
      where: { email: signupDeliverymanDto.email },
    });
    if (deliveryman) {
      throw new BadRequestException('Email already exists!');
    }
    if (signupDeliverymanDto.password !== signupDeliverymanDto.confirm_password) {
      throw new BadRequestException('Passwords is not match!');
    }

    const hashed_password = await bcrypt.hash(signupDeliverymanDto.password, 7);
    const newDeliveryman = await this.deliverymanRepo.create({
      ...signupDeliverymanDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newDeliveryman);

    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updateDeliveryman = await this.deliverymanRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
        activation_link: uniqueKey,
      },
      {
        where: { id: newDeliveryman.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendConfirmation(updateDeliveryman[1][0], 'deliveryman');
    } catch (error) {
      console.log(error);
    }
    const response = {
      message: 'Deliveryman registered',
      user: updateDeliveryman[1][0],
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updateDeliveryman = await this.deliverymanRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updateDeliveryman[1][0]) {
      throw new BadRequestException('Deliveryman already activated');
    }
    const response = {
      message: 'Deliveryman activated successfully',
      user: updateDeliveryman,
    };
    return response;
  }

  async signin(signinDeliverymanDto: SigninDeliverymanDto, res: Response) {
    const { email, password } = signinDeliverymanDto;
    const deliveryman = await this.deliverymanRepo.findOne({ where: { email } });
    if (!deliveryman) {
      throw new UnauthorizedException('Deliveryman not registered');
    }
    if (!deliveryman.is_active) {
      throw new BadRequestException('Deliveryman is not active');
    }
    const isMatchPass = await bcrypt.compare(password, deliveryman.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Deliveryman not registered(pass)');
    }
    const tokens = await this.getTokens(deliveryman);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.deliverymanRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: deliveryman.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Deliveryman signed in',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async signout(refreshToken: string, res: Response) {
    const deliverymanData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!deliverymanData) {
      throw new ForbiddenException('Deliveryman not found');
    }
    const updateDeliveryman = await this.deliverymanRepo.update(
      { hashed_refresh_token: null },
      { where: { id: deliverymanData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Deliveryman signed out successfully',
      user: updateDeliveryman[1][0],
    };
    return response;
  }

  async refreshToken(deliveryman_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (deliveryman_id != decodedToken['id']) {
      throw new BadRequestException('deliveryman not found');
    }
    const deliveryman = await this.deliverymanRepo.findOne({
      where: { id: deliveryman_id },
    });
    if (!deliveryman || !deliveryman.hashed_refresh_token) {
      throw new BadRequestException('deliveryman not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      deliveryman.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(deliveryman);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateDeliveryman = await this.deliverymanRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: deliveryman.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Deliveryman refreshed',
      user: updateDeliveryman[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(deliveryman: Deliveryman) {
    const jwtPayload = {
      id: deliveryman.id,
      phone: deliveryman.phone,
      is_active: deliveryman.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getAllDeliverymans(): Promise<Deliveryman[]> {
    const deliverymans = await this.deliverymanRepo.findAll({
      include: { all: true },
    });
    return deliverymans;
  }

  async getDeliverymanById(id: number): Promise<Deliveryman> {
    const deliveryman = await this.deliverymanRepo.findOne({
      where: { id },
    });
    console.log(deliveryman);

    if (!deliveryman) {
      throw new HttpException('Deliveryman topilmadi', HttpStatus.NOT_FOUND);
    }
    return deliveryman;
  }

  async updateDeliveryman(
    id: number,
    updateDeliverymanDto: UpdateDeliverymanDto,
  ): Promise<Deliveryman> {
    const deliveryman = await this.deliverymanRepo.update(updateDeliverymanDto, {
      where: { id },
      returning: true,
    });
    if (!deliveryman[0]) {
      throw new HttpException('Deliveryman topilmadi', HttpStatus.NOT_FOUND);
    }
    return deliveryman[1][0].dataValues;
  }

  async deleteDeliverymanById(id: number): Promise<object> {
    const deliveryman = await this.deliverymanRepo.destroy({
      where: { id },
    });
    if (!deliveryman) {
      throw new HttpException('Deliveryman topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Deliveryman o'chirildi" };
  }
}
