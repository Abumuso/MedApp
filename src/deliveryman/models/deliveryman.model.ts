import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DeliverymanAttrs {
  first_name: string;
  last_name: string;
  phone: string;
  photo: string;
  passport_series: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string;
}

@Table({ tableName: 'deliveryman' })
export class Deliveryman extends Model<Deliveryman, DeliverymanAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Falonchi',
    description: 'Deliveryman ismi',
  })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: 'Falonchiyev',
    description: 'Deliveryman familiyasi',
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Deliveryman telefon raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'photo.jpg',
    description: 'Deliveryman fotosi',
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: 'AB9320032',
    description: 'Deliveryman passport seriyasi',
  })
  @Column({
    type: DataType.STRING,
  })
  passport_series: string;

  @ApiProperty({
    example: 'falon1@mail.uz',
    description: 'Deliveryman elektron pochtasi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'pa$$word',
    description: 'Deliveryman paroli',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'token',
    description: 'Deliveryman tokeni',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
