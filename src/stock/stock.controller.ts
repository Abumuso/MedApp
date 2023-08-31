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
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from './models/stock.model';
import { UpdateStockDto } from './dto/update-stock.dto';

@ApiTags('Stocklar')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiOperation({ summary: 'Stock yaratish' })
  @Post('create')
  async createStock(@Body() createStockDto: CreateStockDto) {
    return this.stockService.createStock(createStockDto);
  }

  @ApiOperation({ summary: "Stocklarni ko'rish" })
  @Get('all')
  async getAllStock(): Promise<Stock[]> {
    return this.stockService.getAllStock();
  }

  @ApiOperation({ summary: "Stockni id bo'yicha ko'rish" })
  @Get(':id')
  async getStockBYId(@Param('id') id: string): Promise<Stock> {
    return this.stockService.getStockById(+id);
  }

  @ApiOperation({ summary: "Stockni o'zgartirish" })
  @Put(':id')
  async updateStock(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ): Promise<Stock> {
    return this.stockService.updateStock(+id, updateStockDto);
  }

  @ApiOperation({ summary: "Stockni o'chirish" })
  @Delete(':id')
  async deleteStockById(@Param('id') id: string): Promise<object> {
    return this.stockService.deleteStockById(+id);
  }
}
