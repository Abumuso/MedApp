import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductOrder } from './models/product_order.model';
import { CreateProductOrderDto } from './dto/create-product_order.dto';
import { UpdateProductOrderDto } from './dto/update-product_order.dto';

@Injectable()
export class ProductOrderService {
  constructor(
    @InjectModel(ProductOrder) private productOrderRepo: typeof ProductOrder,
  ) {}

  async createProductOrder(
    createProductOrderDto: CreateProductOrderDto,
  ): Promise<ProductOrder> {
    const productOrder = await this.productOrderRepo.create(
      createProductOrderDto,
    );
    return productOrder;
  }

  async getAllProductOrder(): Promise<ProductOrder[]> {
    const productOrders = await this.productOrderRepo.findAll({
      include: { all: true },
    });
    return productOrders;
  }

  async getProductOrderById(id: number): Promise<ProductOrder> {
    const productOrder = await this.productOrderRepo.findOne({ where: { id } });
    if (!productOrder) {
      throw new HttpException('ProductOrder topilmadi', HttpStatus.NOT_FOUND);
    }
    return productOrder;
  }

  async updateProductOrder(
    id: number,
    updateProductOrderDto: UpdateProductOrderDto,
  ): Promise<ProductOrder> {
    const productOrder = await this.productOrderRepo.update(
      updateProductOrderDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (!productOrder[0]) {
      throw new HttpException('ProductOrder topilmadi', HttpStatus.NOT_FOUND);
    }
    return productOrder[1][0].dataValues;
  }

  async deleteProductOrderById(id: number): Promise<object> {
    const productOrder = await this.productOrderRepo.destroy({ where: { id } });
    if (!productOrder) {
      throw new HttpException('ProductOrder topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "ProductOrder o'chirildi" };
  }
}
