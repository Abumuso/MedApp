import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Stock } from './models/stock.model';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(@InjectModel(Stock) private stockRepo: typeof Stock) {}

  async createStock(createStockDto: CreateStockDto): Promise<Stock> {
    const stock = await this.stockRepo.create(createStockDto);
    return stock;
  }

  async getAllStock(): Promise<Stock[]> {
    const stocks = await this.stockRepo.findAll({
      include: { all: true },
    });
    return stocks;
  }

  async getStockById(id: number): Promise<Stock> {
    const stock = await this.stockRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!stock) {
      throw new HttpException('Stock topilmadi', HttpStatus.NOT_FOUND);
    }
    return stock;
  }

  async updateStock(
    id: number,
    updateStockDto: UpdateStockDto,
  ): Promise<Stock> {
    const stock = await this.stockRepo.update(updateStockDto, {
      where: { id },
      returning: true,
    });
    if (!stock[0]) {
      throw new HttpException('Stock topilmadi', HttpStatus.NOT_FOUND);
    }
    return stock[1][0].dataValues;
  }

  async deleteStockById(id: number): Promise<object> {
    const stock = await this.stockRepo.destroy({ where: { id } });
    if (!stock) {
      throw new HttpException('Stock topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Stock o'chirildi" };
  }
}
