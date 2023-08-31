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
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { Pharmacy } from './models/pharmacy.model';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@ApiTags('Pharmacylar')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @ApiOperation({ summary: 'Pharmacy yaratish' })
  @Post('create')
  async createPharmacy(@Body() createPharmacyDto: CreatePharmacyDto) {
    return this.pharmacyService.createPharmacy(createPharmacyDto);
  }

  @ApiOperation({ summary: "Pharmacylarni ko'rish" })
  @Get('all')
  async getAllPharmacy(): Promise<Pharmacy[]> {
    return this.pharmacyService.getAllPharmacy();
  }

  @ApiOperation({ summary: "Pharmacyni id bo'yicha ko'rish" })
  @Get(':id')
  async getPharmacyBYId(@Param('id') id: string): Promise<Pharmacy> {
    return this.pharmacyService.getPharmacyById(+id);
  }

  @ApiOperation({ summary: "Pharmacyni o'zgartirish" })
  @Put(':id')
  async updatePharmacy(
    @Param('id') id: string,
    @Body() updatePharmacyDto: UpdatePharmacyDto,
  ): Promise<Pharmacy> {
    return this.pharmacyService.updatePharmacy(+id, updatePharmacyDto);
  }

  @ApiOperation({ summary: "Pharmacyni o'chirish" })
  @Delete(':id')
  async deletePharmacyById(@Param('id') id: string): Promise<object> {
    return this.pharmacyService.deletePharmacyById(+id);
  }
}
