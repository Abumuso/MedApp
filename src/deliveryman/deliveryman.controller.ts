import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { CreateDeliverymanDto } from './dto/create-deliveryman.dto';
import { UpdateDeliverymanDto } from './dto/update-deliveryman.dto';

@Controller('deliveryman')
export class DeliverymanController {
  constructor(private readonly deliverymanService: DeliverymanService) {}

  @Post()
  create(@Body() createDeliverymanDto: CreateDeliverymanDto) {
    return this.deliverymanService.create(createDeliverymanDto);
  }

  @Get()
  findAll() {
    return this.deliverymanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliverymanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliverymanDto: UpdateDeliverymanDto) {
    return this.deliverymanService.update(+id, updateDeliverymanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliverymanService.remove(+id);
  }
}
