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
import { Owner } from './models/owner.model';
import { SignupOwnerDto } from './dto/signup-owner.dto';
import { SigninOwnerDto } from './dto/signin-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner) private readonly ownerRepo: typeof Owner,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async signup(signupOwnerDto: SignupOwnerDto, res: Response) {
    const owner = await this.ownerRepo.findOne({
      where: { email: signupOwnerDto.email },
    });
    if (owner) {
      throw new BadRequestException('Email already exists!');
    }
    if (signupOwnerDto.password !== signupOwnerDto.confirm_password) {
      throw new BadRequestException('Passwords is not match!');
    }

    const hashed_password = await bcrypt.hash(signupOwnerDto.password, 7);
    const newOwner = await this.ownerRepo.create({
      ...signupOwnerDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newOwner);

    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updateOwner = await this.ownerRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
        activation_link: uniqueKey,
      },
      {
        where: { id: newOwner.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendOwnerConfirmation(updateOwner[1][0]);
    } catch (error) {
      console.log(error);
    }
    const response = {
      message: 'Owner registered',
      user: updateOwner[1][0],
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updateOwner = await this.ownerRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updateOwner[1][0]) {
      throw new BadRequestException('Owner already activated');
    }
    const response = {
      message: 'Owner activated successfully',
      user: updateOwner,
    };
    return response;
  }

  async signin(signinOwnerDto: SigninOwnerDto, res: Response) {
    const { email, password } = signinOwnerDto;
    const owner = await this.ownerRepo.findOne({ where: { email } });
    if (!owner) {
      throw new UnauthorizedException('Owner not registered');
    }
    if (!owner.is_active) {
      throw new BadRequestException('Owner is not active');
    }
    const isMatchPass = await bcrypt.compare(password, owner.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Owner not registered(pass)');
    }
    const tokens = await this.getTokens(owner);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.ownerRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: owner.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Owner signed in',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async signout(refreshToken: string, res: Response) {
    const ownerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!ownerData) {
      throw new ForbiddenException('Owner not found');
    }
    const updateOwner = await this.ownerRepo.update(
      { hashed_refresh_token: null },
      { where: { id: ownerData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Owner signed out successfully',
      user: updateOwner[1][0],
    };
    return response;
  }

  async refreshToken(owner_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (owner_id != decodedToken['id']) {
      throw new BadRequestException('owner not found');
    }
    const owner = await this.ownerRepo.findOne({
      where: { id: owner_id },
    });
    if (!owner || !owner.hashed_refresh_token) {
      throw new BadRequestException('owner not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      owner.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(owner);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateOwner = await this.ownerRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: owner.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Owner refreshed',
      user: updateOwner[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(owner: Owner) {
    const jwtPayload = {
      id: owner.id,
      phone: owner.phone,
      is_active: owner.is_active,
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

  async getAllOwners(): Promise<Owner[]> {
    const owners = await this.ownerRepo.findAll({
      include: { all: true },
    });
    return owners;
  }

  async getOwnerById(id: number): Promise<Owner> {
    const owner = await this.ownerRepo.findOne({
      where: { id },
    });
    console.log(owner);

    if (!owner) {
      throw new HttpException('Owner topilmadi', HttpStatus.NOT_FOUND);
    }
    return owner;
  }

  async updateOwner(
    id: number,
    updateOwnerDto: UpdateOwnerDto,
  ): Promise<Owner> {
    const owner = await this.ownerRepo.update(updateOwnerDto, {
      where: { id },
      returning: true,
    });
    if (!owner[0]) {
      throw new HttpException('Owner topilmadi', HttpStatus.NOT_FOUND);
    }
    return owner[1][0].dataValues;
  }

  async deleteOwnerById(id: number): Promise<object> {
    const owner = await this.ownerRepo.destroy({
      where: { id },
    });
    if (!owner) {
      throw new HttpException('Owner topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Owner o'chirildi" };
  }
}
