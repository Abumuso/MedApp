import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Medproduct } from './models/medproduct.model';
import { CreateMedproductDto } from './dto/create-medproduct.dto';
import { UpdateMedproductDto } from './dto/update-medproduct.dto';

@Injectable()
export class MedproductService {
  constructor(
    @InjectModel(Medproduct) private medproductRepo: typeof Medproduct,
  ) {}

  async createMedproduct(
    createMedproductDto: CreateMedproductDto,
  ): Promise<Medproduct> {
    const medproduct = await this.medproductRepo.create(createMedproductDto);
    return medproduct;
  }

  async getAllMedproduct(): Promise<Medproduct[]> {
    const medproducts = await this.medproductRepo.findAll({
      include: { all: true },
    });
    return medproducts;
  }

  async getMedproductById(id: number): Promise<Medproduct> {
    const medproduct = await this.medproductRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!medproduct) {
      throw new HttpException('Medproduct topilmadi', HttpStatus.NOT_FOUND);
    }
    return medproduct;
  }

  async updateMedproduct(
    id: number,
    updateMedproductDto: UpdateMedproductDto,
  ): Promise<Medproduct> {
    const medproduct = await this.medproductRepo.findByPk(id);
    if (!medproduct) {
      throw new HttpException('Medproduct topilmadi', HttpStatus.NOT_FOUND);
    }
    const medproduct2 = await this.medproductRepo.update(updateMedproductDto, {
      where: { id },
      returning: true,
    });
    if (!medproduct2[0]) {
      throw new HttpException(
        "o'zgartilayotgan qator kiritilmadi",
        HttpStatus.NOT_FOUND,
      );
    }
    return medproduct[1][0].dataValues;
  }

  async deleteMedproductById(id: number): Promise<object> {
    const medproduct = await this.medproductRepo.destroy({ where: { id } });
    if (!medproduct) {
      throw new HttpException('Medproduct topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Medproduct o'chirildi" };
  }
}
