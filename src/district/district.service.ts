import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.model';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtRepo: typeof District) {}

  async createDistrict(createDistrictDto: CreateDistrictDto): Promise<District> {
    const district = await this.districtRepo.create(createDistrictDto);
    return district;
  }

  async getAllDistrict(): Promise<District[]> {
    const districts = await this.districtRepo.findAll({
      include: { all: true },
    });
    return districts;
  }

  async getDistrictById(id: number): Promise<District> {
    const district = await this.districtRepo.findOne({ where: { id } });
    if (!district) {
      throw new HttpException('District topilmadi', HttpStatus.NOT_FOUND);
    }
    return district;
  }

  async updateDistrict(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const district = await this.districtRepo.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    if (!district[0]) {
      throw new HttpException('District topilmadi', HttpStatus.NOT_FOUND);
    }
    return district[1][0].dataValues;
  }

  async deleteDistrictById(id: number): Promise<object> {
    const district = await this.districtRepo.destroy({ where: { id } });
    if (!district) {
      throw new HttpException('District topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "District o'chirildi" };
  }
}
