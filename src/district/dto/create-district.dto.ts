import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({ example: 'Tashlent', description: 'District nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;
    
  @ApiProperty({ example: 'Tashlent', description: 'District nomi' })
  @IsNotEmpty()
  @IsNumber()
  region_id: number;
}
