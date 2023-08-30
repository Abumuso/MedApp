import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { SignupUserDto } from './signup-user.dto';

export class UpdateUserDto extends PartialType(SignupUserDto) {
  @ApiProperty({
    example: 'Falonchi1',
    description: 'User ismi',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Falonchi1',
    description: 'User ismi',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'Chilonzor 9',
    description: 'User adresi',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'User telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
