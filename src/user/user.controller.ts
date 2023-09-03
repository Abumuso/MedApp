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
import { UserService } from './user.service';
import { User } from './models/user.model';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from '../guards/user.guard';
import { SelfGuard } from '../guards/self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Userlar')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'signup User' })
  @ApiResponse({ status: 201, type: User })
  @Post('signup')
  signup(
    @Body() signupUserDto: SignupUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signup(signupUserDto, res);
  }

  @ApiOperation({ summary: 'signin User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signin(signinUserDto, res);
  }

  @ApiOperation({ summary: 'signout User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signout(refreshToken, res);
  }

  @UseGuards(UserGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'activate user' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.userService.activate(link);
  }

  @ApiOperation({ summary: "Userlarni ko'rish" })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Userni id bo'yicha ko'rish" })
  @UseGuards(SelfGuard)
  @UseGuards(UserGuard)
  @Get(':id')
  async getUserBYId(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(+id);
  }

  @ApiOperation({ summary: "Userni o'zgartirish" })
  @UseGuards(SelfGuard)
  @UseGuards(UserGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Userni o'chirish" })
  @UseGuards(SelfGuard)
  @UseGuards(UserGuard)
  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<object> {
    return this.userService.deleteUserById(+id);
  }
}
