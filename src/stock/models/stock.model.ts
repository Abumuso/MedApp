import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pharmacy_id: number;

  @ApiProperty({ example: '1', description: 'Med_Product IDsi' })
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
}
