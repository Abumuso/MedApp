import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreatePharmacyDto {
  @ApiProperty({
    example: 'Ababil',
    description: 'Pharmacy nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1',
    description: 'Region IDsi',
  })
  @IsNumber()
  @IsNotEmpty()
  region_id: number;

  @ApiProperty({
    example: '1',
    description: 'District IDsi',
  })
  @IsNumber()
  @IsNotEmpty()
  district_id: number;

  @ApiProperty({
    example: 'Chimboy chorraha',
    description: 'Pharmacy addresi',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '4651.16531.1651.54',
    description: 'Pharmacy lokasiyasi',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Pharmacy telefon raqami',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '1',
    description: 'Owner IDsi',
  })
  @IsNumber()
  @IsNotEmpty()
  owner_id: number;
}
