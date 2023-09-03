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
import { OwnerService } from './owner.service';
import { Owner } from './models/owner.model';
import { SignupOwnerDto } from './dto/signup-owner.dto';
import { SigninOwnerDto } from './dto/signin-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerGuard } from '../guards/owner.guard';
import { SelfGuard } from '../guards/self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Ownerlar')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @ApiOperation({ summary: 'signup Owner' })
  @ApiResponse({ status: 201, type: Owner })
  @Post('signup')
  signup(
    @Body() signupOwnerDto: SignupOwnerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.ownerService.signup(signupOwnerDto, res);
  }

  @ApiOperation({ summary: 'signin Owner' })
  @ApiResponse({ status: 200, type: Owner })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() signinOwnerDto: SigninOwnerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.ownerService.signin(signinOwnerDto, res);
  }

  @ApiOperation({ summary: 'signout Owner' })
  @ApiResponse({ status: 200, type: Owner })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.ownerService.signout(refreshToken, res);
  }

  @UseGuards(OwnerGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.ownerService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'activate owner' })
  @ApiResponse({ status: 200, type: [Owner] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.ownerService.activate(link);
  }

  @ApiOperation({ summary: "Ownerlarni ko'rish" })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllOwners(): Promise<Owner[]> {
    return this.ownerService.getAllOwners();
  }

  @ApiOperation({ summary: "Ownerni id bo'yicha ko'rish" })
  @UseGuards(SelfGuard)
  @UseGuards(OwnerGuard)
  @Get(':id')
  async getOwnerBYId(@Param('id') id: string): Promise<Owner> {
    return this.ownerService.getOwnerById(+id);
  }

  @ApiOperation({ summary: "Ownerni o'zgartirish" })
  @UseGuards(SelfGuard)
  @UseGuards(OwnerGuard)
  @Put(':id')
  async updateOwner(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ): Promise<Owner> {
    return this.ownerService.updateOwner(+id, updateOwnerDto);
  }

  @ApiOperation({ summary: "Ownerni o'chirish" })
  @UseGuards(SelfGuard)
  @UseGuards(OwnerGuard)
  @Delete(':id')
  async deleteOwnerById(@Param('id') id: string): Promise<object> {
    return this.ownerService.deleteOwnerById(+id);
  }
}
