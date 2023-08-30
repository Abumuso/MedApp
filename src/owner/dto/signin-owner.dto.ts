import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninOwnerDto {
  @ApiProperty({
    example: 'falon1@mail.uz',
    description: 'Owner elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'pa$$word',
    description: 'Owner paroli',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
