import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/models/region.model';
import { District } from '../../district/models/district.model';
import { Owner } from '../../owner/models/owner.model';

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
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @ApiProperty({
    example: '1',
    description: 'District IDsi',
  })
  @ForeignKey(() => District)
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
  @ForeignKey(() => Owner)
  @Column({
    type: DataType.INTEGER,
  })
  owner_id: number;

  @BelongsTo(() => Region)
  region: Region;

  @BelongsTo(() => District)
  district: District;

  @BelongsTo(() => Owner)
  owner: Owner;
}
