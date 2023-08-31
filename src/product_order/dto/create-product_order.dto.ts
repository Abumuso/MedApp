import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductOrderDto {
  @ApiProperty({ example: '1', description: 'Order IDsi' })
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @ApiProperty({ example: '1', description: 'Stock IDsi' })
  @IsNotEmpty()
  @IsNumber()
  stock_id: number;

  @ApiProperty({ example: '10', description: 'Nechta mavjudligi' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
