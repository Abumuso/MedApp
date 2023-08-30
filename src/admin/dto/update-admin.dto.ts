import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SignupAdminDto } from './signup-admin.dto';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateAdminDto extends PartialType(SignupAdminDto) {
  @ApiProperty({
    example: 'Falonchi1',
    description: 'Admin ismi',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Falonchi1',
    description: 'Admin ismi',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
