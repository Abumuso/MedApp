import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PhotoAttr {
  name: string;
}

@Table({ tableName: 'photo' })
export class Photo extends Model<Photo, PhotoAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Med_Product IDsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  med_product_id: number;
}
