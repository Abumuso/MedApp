import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TypeAttr {
  name: string;
}

@Table({ tableName: 'type' })
export class Type extends Model<Type, TypeAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'tablets', description: 'Type nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
