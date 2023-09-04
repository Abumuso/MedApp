import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/models/admin.model';
import { OwnerModule } from './owner/owner.module';
import { UserModule } from './user/user.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { PhotoModule } from './photo/photo.module';
import { TypeModule } from './type/type.module';
import { StatusModule } from './status/status.module';
import { StockModule } from './stock/stock.module';
import { ProductOrderModule } from './product_order/product_order.module';
import { OrderModule } from './order/order.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { MedproductModule } from './medproduct/medproduct.module';
import { Deliveryman } from './deliveryman/models/deliveryman.model';
import { District } from './district/models/district.model';
import { Medproduct } from './medproduct/models/medproduct.model';
import { Order } from './order/models/order.model';
import { Owner } from './owner/models/owner.model';
import { Pharmacy } from './pharmacy/models/pharmacy.model';
import { Photo } from './photo/models/photo.model';
import { ProductOrder } from './product_order/models/product_order.model';
import { Region } from './region/models/region.model';
import { Status } from './status/models/status.model';
import { Stock } from './stock/models/stock.model';
import { Type } from './type/models/type.model';
import { User } from './user/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Deliveryman,
        District,
        Medproduct,
        Order,
        Owner,
        Pharmacy,
        Photo,
        ProductOrder,
        Region,
        Status,
        Stock,
        Type,
        User,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    MailModule,
    OwnerModule,
    UserModule,
    DeliverymanModule,
    RegionModule,
    DistrictModule,
    PhotoModule,
    TypeModule,
    StatusModule,
    StockModule,
    ProductOrderModule,
    OrderModule,
    PharmacyModule,
    MedproductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
