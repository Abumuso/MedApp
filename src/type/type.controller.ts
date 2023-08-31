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
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './models/type.model';
import { UpdateTypeDto } from './dto/update-type.dto';

@ApiTags('Typelar')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @ApiOperation({ summary: 'Type yaratish' })
  @Post('create')
  async createType(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.createType(createTypeDto);
  }

  @ApiOperation({ summary: "Typelarni ko'rish" })
  @Get('all')
  async getAllType(): Promise<Type[]> {
    return this.typeService.getAllType();
  }

  @ApiOperation({ summary: "Typeni id bo'yicha ko'rish" })
  @Get(':id')
  async getTypeBYId(@Param('id') id: string): Promise<Type> {
    return this.typeService.getTypeById(+id);
  }

  @ApiOperation({ summary: "Typeni o'zgartirish" })
  @Put(':id')
  async updateType(
    @Param('id') id: string,
    @Body() updateTypeDto: UpdateTypeDto,
  ): Promise<Type> {
    return this.typeService.updateType(+id, updateTypeDto);
  }

  @ApiOperation({ summary: "Typeni o'chirish" })
  @Delete(':id')
  async deleteTypeById(@Param('id') id: string): Promise<object> {
    return this.typeService.deleteTypeById(+id);
  }
}
