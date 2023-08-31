import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepo: typeof Order) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepo.create(createOrderDto);
    return order;
  }

  async getAllOrder(): Promise<Order[]> {
    const orders = await this.orderRepo.findAll({
      include: { all: true },
    });
    return orders;
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new HttpException('Order topilmadi', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderRepo.update(updateOrderDto, {
      where: { id },
      returning: true,
    });
    if (!order[0]) {
      throw new HttpException('Order topilmadi', HttpStatus.NOT_FOUND);
    }
    return order[1][0].dataValues;
  }

  async deleteOrderById(id: number): Promise<object> {
    const order = await this.orderRepo.destroy({ where: { id } });
    if (!order) {
      throw new HttpException('Order topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Order o'chirildi" };
  }
}
