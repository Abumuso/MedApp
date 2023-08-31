import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Orderlar')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Order yaratish' })
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: "Orderlarni ko'rish" })
  @Get('all')
  async getAllOrder(): Promise<Order[]> {
    return this.orderService.getAllOrder();
  }

  @ApiOperation({ summary: "Orderni id bo'yicha ko'rish" })
  @Get(':id')
  async getOrderBYId(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(+id);
  }

  @ApiOperation({ summary: "Orderni o'zgartirish" })
  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(+id, updateOrderDto);
  }

  @ApiOperation({ summary: "Orderni o'chirish" })
  @Delete(':id')
  async deleteOrderById(@Param('id') id: string): Promise<object> {
    return this.orderService.deleteOrderById(+id);
  }
}
