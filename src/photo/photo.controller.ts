import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './models/photo.model';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@ApiTags('Photolar')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @ApiOperation({ summary: 'Photo yaratish' })
  @Post('create')
  async createPhoto(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.createPhoto(createPhotoDto);
  }

  @ApiOperation({ summary: "Photolarni ko'rish" })
  @Get('all')
  async getAllPhoto(): Promise<Photo[]> {
    return this.photoService.getAllPhoto();
  }

  @ApiOperation({ summary: "Photoni id bo'yicha ko'rish" })
  @Get(':id')
  async getPhotoBYId(@Param('id') id: string): Promise<Photo> {
    return this.photoService.getPhotoById(+id);
  }

  @ApiOperation({ summary: "Photoni o'zgartirish" })
  @Put(':id')
  async updatePhoto(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo> {
    return this.photoService.updatePhoto(+id, updatePhotoDto);
  }

  @ApiOperation({ summary: "Photoni o'chirish" })
  @Delete(':id')
  async deletePhotoById(@Param('id') id: string): Promise<object> {
    return this.photoService.deletePhotoById(+id);
  }
}
