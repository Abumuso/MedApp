import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PharmacyAttrs {
  name: string;
  region_id: number;
  district_id: number;
  address: string;
  location: string;
  phone: string;
  owner_id: number;
}

@Table({ tableName: 'Pharmacys' })
export class Pharmacy extends Model<Pharmacy, PharmacyAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Ababil',
    description: 'Pharmacy nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'Region IDsi',
  })
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @ApiProperty({
    example: '1',
    description: 'District IDsi',
  })
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;

  @ApiProperty({
    example: 'Chimboy chorraha',
    description: 'Pharmacy addresi',
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    example: '4651.16531.1651.54',
    description: 'Pharmacy lokasiyasi',
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Pharmacy telefon raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: '1',
    description: 'Owner IDsi',
  })
  @Column({
    type: DataType.INTEGER,
  })
  owner_id: number;
}
