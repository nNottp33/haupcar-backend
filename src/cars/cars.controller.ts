import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseModel } from '@/common/models';
import {
  transformDefaultResult,
  transformPagination,
} from '@/common/transforms';
import { CarsService } from './cars.service';
import { CreateCarInput, QueryCarInput, UpdateCarInput } from './dto';
import { CarListResponseModel, CarResponseModel } from './models';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly services: CarsService) {}

  @Post()
  @ApiCreatedResponse({ type: BaseResponseModel })
  async create(@Body() input: CreateCarInput) {
    await this.services.create(input);
    return transformDefaultResult(201, 'Created car successfully');
  }

  @Get()
  @ApiOkResponse({ type: CarListResponseModel })
  async findAll(@Query() query: QueryCarInput) {
    const { page, limit } = query;
    const { cars, total } = await this.services.findAll(page, limit);
    return transformPagination('Fetched cars successfully', cars, {
      total,
      page,
      limit,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: CarResponseModel })
  async findOne(@Param('id') id: string) {
    const data = await this.services.findOne(id);
    return transformDefaultResult(200, 'Fetched car successfully', data);
  }

  @Put(':id')
  @ApiOkResponse({ type: BaseResponseModel })
  async update(@Param('id') id: string, @Body() input: UpdateCarInput) {
    await this.services.update(id, input);
    return transformDefaultResult(200, 'Updated car successfully');
  }

  @Delete(':id')
  @ApiOkResponse({ type: BaseResponseModel })
  async remove(@Param('id') id: string) {
    await this.services.remove(id);
    return transformDefaultResult(200, 'Deleted car successfully');
  }
}
