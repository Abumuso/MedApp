import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SignupDeliverymanDto {
  @ApiProperty({
    example: 'Falonchi1',
    description: 'Deliveryman ismi',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Falonchi1',
    description: 'Deliveryman ismi',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'AB9420042',
    description: 'Deliveryman pasport seriyasi',
  })
  @IsNotEmpty()
  @IsString()
  passport_series: string;

  @ApiProperty({
    example: 'falon1@mail.uz',
    description: 'Deliveryman elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Deliveryman paroli',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'confirm_password',
    description: 'Deliveryman paroli',
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Deliveryman telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'photo.jpg',
    description: 'Deliveryman fotosi',
  })
  @IsString()
  photo: string;
}
