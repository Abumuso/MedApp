import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttrs {
  first_name: string;
  last_name: string;
  email: string;
  hashed_password: string;
  phone: string;
  is_active: boolean;
  is_super: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Falonchi',
    description: 'Admin ismi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  first_name: string;

  @ApiProperty({
    example: 'Falonchiyev',
    description: 'Admin familiyasi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  last_name: string;

  @ApiProperty({
    example: 'falon1@mail.uz',
    description: 'Admin elektron pochtasi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'pa$$word',
    description: 'Admin paroli',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin telefon raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'false',
    description: 'Admin tasdiqlangan holati',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Admin statusi',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_super: boolean;

  @ApiProperty({
    example: 'token',
    description: 'Admin tokeni',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
