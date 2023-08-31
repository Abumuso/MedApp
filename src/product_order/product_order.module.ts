import { Module } from '@nestjs/common';
import { ProductOrderService } from './product_order.service';
import { ProductOrderController } from './product_order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductOrder } from './models/product_order.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductOrder])],
  controllers: [ProductOrderController],
  providers: [ProductOrderService],
})
export class ProductOrderModule {}
