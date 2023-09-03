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
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;
}
