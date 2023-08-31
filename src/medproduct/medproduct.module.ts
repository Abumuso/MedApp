import { Module } from '@nestjs/common';
import { MedproductService } from './medproduct.service';
import { MedproductController } from './medproduct.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Medproduct } from './models/medproduct.model';

@Module({
  imports: [SequelizeModule.forFeature([Medproduct])],
  controllers: [MedproductController],
  providers: [MedproductService],
})
export class MedproductModule {}
