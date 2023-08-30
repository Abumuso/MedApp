import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDeliverymanDto {
  @ApiProperty({
    example: 'falon1@mail.uz',
    description: 'Deliveryman elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'pa$$word',
    description: 'Deliveryman paroli',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
