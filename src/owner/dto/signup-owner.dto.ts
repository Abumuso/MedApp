import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SignupOwnerDto {
  @ApiProperty({
    example: 'Falonchi1',
    description: 'Owner ismi',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Falonchi1',
    description: 'Owner ismi',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'AB9420042',
    description: 'Owner pasport seriyasi',
  })
  @IsNotEmpty()
  @IsString()
  passport_series: string;

  @ApiProperty({
    example: 'falon1@mail.uz',
    description: 'Owner elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Owner paroli',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'confirm_password',
    description: 'Owner paroli',
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Owner telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
