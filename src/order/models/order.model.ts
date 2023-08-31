import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface OrderAttr {
  name: string;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'User IDsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({ example: '1', description: 'Deliveryman IDsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  deliveryman_id: number;

  @ApiProperty({ example: '10', description: 'Status IDsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status_id: number;
}
