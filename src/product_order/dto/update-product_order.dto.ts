import { PartialType } from '@nestjs/swagger';
import { CreateProductOrderDto } from './create-product_order.dto';

export class UpdateProductOrderDto extends PartialType(CreateProductOrderDto) {}
