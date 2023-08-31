import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pharmacy } from './models/pharmacy.model';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@Injectable()
export class PharmacyService {
  constructor(@InjectModel(Pharmacy) private pharmacyRepo: typeof Pharmacy) {}

  async createPharmacy(createPharmacyDto: CreatePharmacyDto): Promise<Pharmacy> {
    const pharmacy = await this.pharmacyRepo.create(createPharmacyDto);
    return pharmacy;
  }

  async getAllPharmacy(): Promise<Pharmacy[]> {
    const pharmacys = await this.pharmacyRepo.findAll({
      include: { all: true },
    });
    return pharmacys;
  }

  async getPharmacyById(id: number): Promise<Pharmacy> {
    const pharmacy = await this.pharmacyRepo.findOne({ where: { id } });
    if (!pharmacy) {
      throw new HttpException('Pharmacy topilmadi', HttpStatus.NOT_FOUND);
    }
    return pharmacy;
  }

  async updatePharmacy(
    id: number,
    updatePharmacyDto: UpdatePharmacyDto,
  ): Promise<Pharmacy> {
    const pharmacy = await this.pharmacyRepo.findByPk(id);
    if (!pharmacy) {
      throw new HttpException('Pharmacy topilmadi', HttpStatus.NOT_FOUND);
    }
    const pharmacy2 = await this.pharmacyRepo.update(updatePharmacyDto, {
      where: { id },
      returning: true,
    });
    if (!pharmacy2[0]) {
      throw new HttpException("o'zgartilayotgan qator kiritilmadi", HttpStatus.NOT_FOUND);
    }
    return pharmacy[1][0].dataValues;
  }

  async deletePharmacyById(id: number): Promise<object> {
    const pharmacy = await this.pharmacyRepo.destroy({ where: { id } });
    if (!pharmacy) {
      throw new HttpException('Pharmacy topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Pharmacy o'chirildi" };
  }
}
