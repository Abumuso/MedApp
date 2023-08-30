import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ example: 'Tashlent', description: 'Region nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
