import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepo: typeof Region) {}

  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = await this.regionRepo.create(createRegionDto);
    return region;
  }

  async getAllRegion(): Promise<Region[]> {
    const regions = await this.regionRepo.findAll({
      include: { all: true },
    });
    return regions;
  }

  async getRegionById(id: number): Promise<Region> {
    const region = await this.regionRepo.findOne({ where: { id } });
    if (!region) {
      throw new HttpException('Region topilmadi', HttpStatus.NOT_FOUND);
    }
    return region;
  }

  async updateRegion(
    id: number,
    updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    const region = await this.regionRepo.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    if (!region[0]) {
      throw new HttpException('Region topilmadi', HttpStatus.NOT_FOUND);
    }
    return region[1][0].dataValues;
  }

  async deleteRegionById(id: number): Promise<object> {
    const region = await this.regionRepo.destroy({ where: { id } });
    if (!region) {
      throw new HttpException('Region topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Region o'chirildi" };
  }
}
