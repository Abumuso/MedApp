import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninAdminDto {
  @ApiProperty({
    example: 'falon1@mail.uz',
    description: 'Admin elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'pa$$word',
    description: 'Admin paroli',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
