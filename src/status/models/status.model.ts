import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface StatusAttr {
  name: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, StatusAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'tablets', description: 'Status nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
