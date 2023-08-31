import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateMedproductDto {
  @ApiProperty({
    example: 'Aspirin',
    description: 'Medproduct nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1',
    description: 'Type IDsi',
  })
  @IsNumber()
  @IsNotEmpty()
  type_id: number;

  @ApiProperty({
    example: 'Nobelpharm',
    description: 'ishlab chiqaruvchi',
  })
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({
    example: '2500',
    description: 'Medproduct narxi',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'Aspirin dlya lecheniya...',
    description: 'Medproduct haqida',
  })
  @IsString()
  @IsNotEmpty()
  info: string;
}
