import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DistrictAttr {
  name: string;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Tashkent', description: 'District nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '1', description: 'Region IDsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  region_id: number;
}
