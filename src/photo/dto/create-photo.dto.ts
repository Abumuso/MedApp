import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePhotoDto {
  @ApiProperty({ example: '1', description: 'Photo nomi' })
  @IsNotEmpty()
  @IsNumber()
  med_product_id: number;
}
