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
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { District } from './models/district.model';
import { UpdateDistrictDto } from './dto/update-district.dto';

@ApiTags('Districtlar')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'District yaratish' })
  @Post('create')
  async createDistrict(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.createDistrict(createDistrictDto);
  }

  @ApiOperation({ summary: "Districtlarni ko'rish" })
  @Get('all')
  async getAllDistrict(): Promise<District[]> {
    return this.districtService.getAllDistrict();
  }

  @ApiOperation({ summary: "Districtni id bo'yicha ko'rish" })
  @Get(':id')
  async getDistrictBYId(@Param('id') id: string): Promise<District> {
    return this.districtService.getDistrictById(+id);
  }

  @ApiOperation({ summary: "Districtni o'zgartirish" })
  @Put(':id')
  async updateDistrict(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    return this.districtService.updateDistrict(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: "Districtni o'chirish" })
  @Delete(':id')
  async deleteDistrictById(@Param('id') id: string): Promise<object> {
    return this.districtService.deleteDistrictById(+id);
  }
}
