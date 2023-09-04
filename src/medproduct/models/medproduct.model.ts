import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Type } from '../../type/models/type.model';

interface MedproductAttrs {
  name: string;
  type_id: number;
  manufacturer: string;
  price: number;
  info: string;
}

@Table({ tableName: 'medproduct' })
export class Medproduct extends Model<Medproduct, MedproductAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Aspirin',
    description: 'Medproduct nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'Type IDsi',
  })
  @ForeignKey(() => Type)
  @Column({
    type: DataType.INTEGER,
  })
  type_id: number;

  @ApiProperty({
    example: 'NobelPharm',
    description: 'Medproduct ishlab chiqaruvchi',
  })
  @Column({
    type: DataType.STRING,
  })
  manufacturer: string;

  @ApiProperty({
    example: '2500',
    description: 'Medproduct narxi',
  })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @ApiProperty({
    example: 'Aspirin - preparat dlya...',
    description: 'Medproduct haqida informaciya',
  })
  @Column({
    type: DataType.TEXT,
  })
  info: string;

  @BelongsTo(() => Type)
  type: Type;
}
