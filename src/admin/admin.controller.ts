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
import { AdminService } from './admin.service';
import { SignupAdminDto } from './dto/signup-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { Response } from 'express';
import { SigninAdminDto } from './dto/signin-admin.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { SelfGuard } from '../guards/self.guard';
import { SuperAdminGuard } from '../guards/superadmin.guard';

@ApiTags('Adminlar')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'signup Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  signup(
    @Body() signupAdminDto: SignupAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signup(signupAdminDto, res);
  }

  @ApiOperation({ summary: 'signin Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() signinAdminDto: SigninAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signin(signinAdminDto, res);
  }

  @ApiOperation({ summary: 'signout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signout(refreshToken, res);
  }

  // @UseGuards(AdminGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'activate admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @ApiOperation({ summary: "Adminlarni ko'rish" })
  @UseGuards(SuperAdminGuard)
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminService.getAllAdmins();
  }

  @ApiOperation({ summary: "Adminni id bo'yicha ko'rish" })
  @UseGuards(SelfGuard)
  @UseGuards(AdminGuard)
  @Get(':id')
  async getAdminBYId(@Param('id') id: string): Promise<Admin> {
    return this.adminService.getAdminById(+id);
  }

  @ApiOperation({ summary: "Adminni o'zgartirish" })
  @UseGuards(SelfGuard)
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni o'chirish" })
  @UseGuards(SelfGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteAdminById(@Param('id') id: string): Promise<object> {
    return this.adminService.deleteAdminById(+id);
  }
}
