import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Medproduct } from '../../medproduct/models/medproduct.model';

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
  @ForeignKey(() => Medproduct)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  med_product_id: number;

  @BelongsTo(() => Medproduct)
  medproduct: Medproduct;
}
