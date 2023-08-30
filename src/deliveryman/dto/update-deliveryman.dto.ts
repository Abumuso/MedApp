import { PartialType } from '@nestjs/swagger';
import { CreateDeliverymanDto } from './create-deliveryman.dto';

export class UpdateDeliverymanDto extends PartialType(CreateDeliverymanDto) {}
