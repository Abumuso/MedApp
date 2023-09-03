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
import { Pharmacy } from '../../pharmacy/models/pharmacy.model';

interface StockAttr {
  name: string;
}

@Table({ tableName: 'stock' })
export class Stock extends Model<Stock, StockAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Pharmacy IDsi' })
  @ForeignKey(() => Pharmacy)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pharmacy_id: number;

  @ApiProperty({ example: '1', description: 'Med_Product IDsi' })
  @ForeignKey(() => Medproduct)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  med_product_id: number;

  @ApiProperty({ example: '10', description: 'Nechta majvudligi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @BelongsTo(() => Medproduct)
  medproduct: Medproduct;

  @BelongsTo(() => Pharmacy)
  pharmacy: Pharmacy;
}
