import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninUserDto {
  @ApiProperty({
    example: 'falon1@mail.uz',
    description: 'User elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'pa$$word',
    description: 'User paroli',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
