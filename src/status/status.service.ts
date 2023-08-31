import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './models/status.model';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusRepo: typeof Status) {}

  async createStatus(createStatusDto: CreateStatusDto): Promise<Status> {
    const status = await this.statusRepo.create(createStatusDto);
    return status;
  }

  async getAllStatus(): Promise<Status[]> {
    const statuss = await this.statusRepo.findAll({
      include: { all: true },
    });
    return statuss;
  }

  async getStatusById(id: number): Promise<Status> {
    const status = await this.statusRepo.findOne({ where: { id } });
    if (!status) {
      throw new HttpException('Status topilmadi', HttpStatus.NOT_FOUND);
    }
    return status;
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.statusRepo.update(updateStatusDto, {
      where: { id },
      returning: true,
    });
    if (!status[0]) {
      throw new HttpException('Status topilmadi', HttpStatus.NOT_FOUND);
    }
    return status[1][0].dataValues;
  }

  async deleteStatusById(id: number): Promise<object> {
    const status = await this.statusRepo.destroy({ where: { id } });
    if (!status) {
      throw new HttpException('Status topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Status o'chirildi" };
  }
}
