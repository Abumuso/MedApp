import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stock } from '../../stock/models/stock.model';
import { Order } from '../../order/models/order.model';

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
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @ApiProperty({ example: '1', description: 'Stock IDsi' })
  @ForeignKey(() => Stock)
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

  @BelongsTo(() => Stock)
  stock: Stock;

  @BelongsTo(() => Order)
  order: Order;
}
