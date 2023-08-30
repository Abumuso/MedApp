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
import { CreateRegionDto } from './dto/create-region.dto';
import { Region } from './models/region.model';
import { UpdateRegionDto } from './dto/update-region.dto';
import { RegionService } from './region.service';

@ApiTags('Regionlar')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Region yaratish' })
  @Post('create')
  async createRegion(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.createRegion(createRegionDto);
  }

  @ApiOperation({ summary: "Regionlarni ko'rish" })
  @Get('all')
  async getAllRegion(): Promise<Region[]> {
    return this.regionService.getAllRegion();
  }

  @ApiOperation({ summary: "Regionni id bo'yicha ko'rish" })
  @Get(':id')
  async getRegionBYId(@Param('id') id: string): Promise<Region> {
    return this.regionService.getRegionById(+id);
  }

  @ApiOperation({ summary: "Regionni o'zgartirish" })
  @Put(':id')
  async updateRegion(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    return this.regionService.updateRegion(+id, updateRegionDto);
  }

  @ApiOperation({ summary: "Regionni o'chirish" })
  @Delete(':id')
  async deleteRegionById(@Param('id') id: string): Promise<object> {
    return this.regionService.deleteRegionById(+id);
  }
}
