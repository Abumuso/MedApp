import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { DeliverymanService } from './deliveryman.service';
import { Deliveryman } from './models/deliveryman.model';
import { SignupDeliverymanDto } from './dto/signup-deliveryman.dto';
import { SigninDeliverymanDto } from './dto/signin-deliveryman.dto';
import { UpdateDeliverymanDto } from './dto/update-deliveryman.dto';
import { DeliverymanGuard } from '../guards/deliveryman.guard';
import { SelfGuard } from '../guards/self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Deliverymanlar')
@Controller('deliveryman')
export class DeliverymanController {
  constructor(private readonly deliverymanService: DeliverymanService) {}

  @ApiOperation({ summary: 'signup Deliveryman' })
  @ApiResponse({ status: 201, type: Deliveryman })
  @Post('signup')
  signup(
    @Body() signupDeliverymanDto: SignupDeliverymanDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.deliverymanService.signup(signupDeliverymanDto, res);
  }

  @ApiOperation({ summary: 'signin Deliveryman' })
  @ApiResponse({ status: 200, type: Deliveryman })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() signinDeliverymanDto: SigninDeliverymanDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.deliverymanService.signin(signinDeliverymanDto, res);
  }

  @ApiOperation({ summary: 'signout Deliveryman' })
  @ApiResponse({ status: 200, type: Deliveryman })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.deliverymanService.signout(refreshToken, res);
  }

  @UseGuards(DeliverymanGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.deliverymanService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'activate deliveryman' })
  @ApiResponse({ status: 200, type: [Deliveryman] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.deliverymanService.activate(link);
  }

  @ApiOperation({ summary: "Deliverymanlarni ko'rish" })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllDeliverymans(): Promise<Deliveryman[]> {
    return this.deliverymanService.getAllDeliverymans();
  }

  @ApiOperation({ summary: "Deliverymanni id bo'yicha ko'rish" })
  @UseGuards(SelfGuard)
  @UseGuards(DeliverymanGuard)
  @Get(':id')
  async getDeliverymanBYId(@Param('id') id: string): Promise<Deliveryman> {
    return this.deliverymanService.getDeliverymanById(+id);
  }

  @ApiOperation({ summary: "Deliverymanni o'zgartirish" })
  @UseGuards(SelfGuard)
  @UseGuards(DeliverymanGuard)
  @Put(':id')
  async updateDeliveryman(
    @Param('id') id: string,
    @Body() updateDeliverymanDto: UpdateDeliverymanDto,
  ): Promise<Deliveryman> {
    return this.deliverymanService.updateDeliveryman(+id, updateDeliverymanDto);
  }

  @ApiOperation({ summary: "Deliverymanni o'chirish" })
  @UseGuards(SelfGuard)
  @UseGuards(DeliverymanGuard)
  @Delete(':id')
  async deleteDeliverymanById(@Param('id') id: string): Promise<object> {
    return this.deliverymanService.deleteDeliverymanById(+id);
  }
}
