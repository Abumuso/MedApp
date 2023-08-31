import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '1', description: 'User IDsi' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: '1', description: 'Deliveryman IDsi' })
  @IsNotEmpty()
  @IsNumber()
  deliveryman_id: number;

  @ApiProperty({ example: '10', description: 'Status IDsi' })
  @IsNotEmpty()
  @IsNumber()
  status_id: number;
}
