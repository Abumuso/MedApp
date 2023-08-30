import { Injectable } from '@nestjs/common';
import { CreateDeliverymanDto } from './dto/create-deliveryman.dto';
import { UpdateDeliverymanDto } from './dto/update-deliveryman.dto';

@Injectable()
export class DeliverymanService {
  create(createDeliverymanDto: CreateDeliverymanDto) {
    return 'This action adds a new deliveryman';
  }

  findAll() {
    return `This action returns all deliveryman`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryman`;
  }

  update(id: number, updateDeliverymanDto: UpdateDeliverymanDto) {
    return `This action updates a #${id} deliveryman`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryman`;
  }
}
