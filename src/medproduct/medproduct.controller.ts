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
import { MedproductService } from './medproduct.service';
import { CreateMedproductDto } from './dto/create-medproduct.dto';
import { Medproduct } from './models/medproduct.model';
import { UpdateMedproductDto } from './dto/update-medproduct.dto';

@ApiTags('Medproductlar')
@Controller('medproduct')
export class MedproductController {
  constructor(private readonly medproductService: MedproductService) {}

  @ApiOperation({ summary: 'Medproduct yaratish' })
  @Post('create')
  async createMedproduct(@Body() createMedproductDto: CreateMedproductDto) {
    return this.medproductService.createMedproduct(createMedproductDto);
  }

  @ApiOperation({ summary: "Medproductlarni ko'rish" })
  @Get('all')
  async getAllMedproduct(): Promise<Medproduct[]> {
    return this.medproductService.getAllMedproduct();
  }

  @ApiOperation({ summary: "Medproductni id bo'yicha ko'rish" })
  @Get(':id')
  async getMedproductBYId(@Param('id') id: string): Promise<Medproduct> {
    return this.medproductService.getMedproductById(+id);
  }

  @ApiOperation({ summary: "Medproductni o'zgartirish" })
  @Put(':id')
  async updateMedproduct(
    @Param('id') id: string,
    @Body() updateMedproductDto: UpdateMedproductDto,
  ): Promise<Medproduct> {
    return this.medproductService.updateMedproduct(+id, updateMedproductDto);
  }

  @ApiOperation({ summary: "Medproductni o'chirish" })
  @Delete(':id')
  async deleteMedproductById(@Param('id') id: string): Promise<object> {
    return this.medproductService.deleteMedproductById(+id);
  }
}
