import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
  @ApiProperty({ example: 'tablets', description: 'Type nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
