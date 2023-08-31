import { PartialType } from '@nestjs/swagger';
import { CreateMedproductDto } from './create-medproduct.dto';

export class UpdateMedproductDto extends PartialType(CreateMedproductDto) {}
