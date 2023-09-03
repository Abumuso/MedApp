import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Deliveryman } from '../../deliveryman/models/deliveryman.model';
import { Status } from '../../status/models/status.model';

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
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({ example: '1', description: 'Deliveryman IDsi' })
  @ForeignKey(() => Deliveryman)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  deliveryman_id: number;

  @ApiProperty({ example: '10', description: 'Status IDsi' })
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Deliveryman)
  deliveryman: Deliveryman;

  @BelongsTo(() => Status)
  status: Status;
}
