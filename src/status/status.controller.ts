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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { Status } from './models/status.model';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Statuslar')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Status yaratish' })
  @Post('create')
  async createStatus(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.createStatus(createStatusDto);
  }

  @ApiOperation({ summary: "Statuslarni ko'rish" })
  @Get('all')
  async getAllStatus(): Promise<Status[]> {
    return this.statusService.getAllStatus();
  }

  @ApiOperation({ summary: "Statusni id bo'yicha ko'rish" })
  @Get(':id')
  async getStatusBYId(@Param('id') id: string): Promise<Status> {
    return this.statusService.getStatusById(+id);
  }

  @ApiOperation({ summary: "Statusni o'zgartirish" })
  @Put(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Status> {
    return this.statusService.updateStatus(+id, updateStatusDto);
  }

  @ApiOperation({ summary: "Statusni o'chirish" })
  @Delete(':id')
  async deleteStatusById(@Param('id') id: string): Promise<object> {
    return this.statusService.deleteStatusById(+id);
  }
}
