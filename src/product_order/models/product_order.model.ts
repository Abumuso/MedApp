import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ProductOrderAttr {
  name: string;
}

@Table({ tableName: 'productOrder' })
export class ProductOrder extends Model<ProductOrder, ProductOrderAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Order IDsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @ApiProperty({ example: '1', description: 'Stock IDsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock_id: number;

  @ApiProperty({ example: '10', description: 'Nechta majvudligi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
