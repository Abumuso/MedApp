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
import { ProductOrderService } from './product_order.service';
import { CreateProductOrderDto } from './dto/create-product_order.dto';
import { ProductOrder } from './models/product_order.model';
import { UpdateProductOrderDto } from './dto/update-product_order.dto';

@ApiTags('ProductOrderlar')
@Controller('productOrder')
export class ProductOrderController {
  constructor(private readonly productOrderService: ProductOrderService) {}

  @ApiOperation({ summary: 'ProductOrder yaratish' })
  @Post('create')
  async createProductOrder(@Body() createProductOrderDto: CreateProductOrderDto) {
    return this.productOrderService.createProductOrder(createProductOrderDto);
  }

  @ApiOperation({ summary: "ProductOrderlarni ko'rish" })
  @Get('all')
  async getAllProductOrder(): Promise<ProductOrder[]> {
    return this.productOrderService.getAllProductOrder();
  }

  @ApiOperation({ summary: "ProductOrderni id bo'yicha ko'rish" })
  @Get(':id')
  async getProductOrderBYId(@Param('id') id: string): Promise<ProductOrder> {
    return this.productOrderService.getProductOrderById(+id);
  }

  @ApiOperation({ summary: "ProductOrderni o'zgartirish" })
  @Put(':id')
  async updateProductOrder(
    @Param('id') id: string,
    @Body() updateProductOrderDto: UpdateProductOrderDto,
  ): Promise<ProductOrder> {
    return this.productOrderService.updateProductOrder(+id, updateProductOrderDto);
  }

  @ApiOperation({ summary: "ProductOrderni o'chirish" })
  @Delete(':id')
  async deleteProductOrderById(@Param('id') id: string): Promise<object> {
    return this.productOrderService.deleteProductOrderById(+id);
  }
}
