import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { SignupOwnerDto } from './signup-owner.dto';

export class UpdateOwnerDto extends PartialType(SignupOwnerDto) {
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
    example: '+998901234567',
    description: 'Owner telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
