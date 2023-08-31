import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotoService {
  constructor(@InjectModel(Photo) private photoRepo: typeof Photo) {}

  async createPhoto(
    createPhotoDto: CreatePhotoDto,
  ): Promise<Photo> {
    const photo = await this.photoRepo.create(createPhotoDto);
    return photo;
  }

  async getAllPhoto(): Promise<Photo[]> {
    const photos = await this.photoRepo.findAll({
      include: { all: true },
    });
    return photos;
  }

  async getPhotoById(id: number): Promise<Photo> {
    const photo = await this.photoRepo.findOne({ where: { id } });
    if (!photo) {
      throw new HttpException('Photo topilmadi', HttpStatus.NOT_FOUND);
    }
    return photo;
  }

  async updatePhoto(
    id: number,
    updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo> {
    const photo = await this.photoRepo.update(updatePhotoDto, {
      where: { id },
      returning: true,
    });
    if (!photo[0]) {
      throw new HttpException('Photo topilmadi', HttpStatus.NOT_FOUND);
    }
    return photo[1][0].dataValues;
  }

  async deletePhotoById(id: number): Promise<object> {
    const photo = await this.photoRepo.destroy({ where: { id } });
    if (!photo) {
      throw new HttpException('Photo topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Photo o'chirildi" };
  }
}
