import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'tablets', description: 'Status nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
