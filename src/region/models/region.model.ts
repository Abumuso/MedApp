import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RegionAttr {
  name: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, RegionAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Tashkent', description: 'Region nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
