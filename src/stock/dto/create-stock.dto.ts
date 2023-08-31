import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStockDto {
  @ApiProperty({ example: '1', description: 'Pharmacy IDsi' })
  @IsNotEmpty()
  @IsNumber()
  pharmacy_id: number;

  @ApiProperty({ example: '1', description: 'Med product IDsi' })
  @IsNotEmpty()
  @IsNumber()
  med_product_id: number;

  @ApiProperty({ example: '10', description: 'Nechta mavjudligi' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
