import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './models/type.model';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type) private typeRepo: typeof Type) {}

  async createType(createTypeDto: CreateTypeDto): Promise<Type> {
    const type = await this.typeRepo.create(createTypeDto);
    return type;
  }

  async getAllType(): Promise<Type[]> {
    const types = await this.typeRepo.findAll({
      include: { all: true },
    });
    return types;
  }

  async getTypeById(id: number): Promise<Type> {
    const type = await this.typeRepo.findOne({ where: { id } });
    if (!type) {
      throw new HttpException('Type topilmadi', HttpStatus.NOT_FOUND);
    }
    return type;
  }

  async updateType(
    id: number,
    updateTypeDto: UpdateTypeDto,
  ): Promise<Type> {
    const type = await this.typeRepo.update(updateTypeDto, {
      where: { id },
      returning: true,
    });
    if (!type[0]) {
      throw new HttpException('Type topilmadi', HttpStatus.NOT_FOUND);
    }
    return type[1][0].dataValues;
  }

  async deleteTypeById(id: number): Promise<object> {
    const type = await this.typeRepo.destroy({ where: { id } });
    if (!type) {
      throw new HttpException('Type topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Type o'chirildi" };
  }
}
