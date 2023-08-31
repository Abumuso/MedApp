import { Module } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { PharmacyController } from './pharmacy.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pharmacy } from './models/pharmacy.model';

@Module({
  imports: [SequelizeModule.forFeature([Pharmacy])],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
