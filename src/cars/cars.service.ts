import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/database/prisma.service';
import { messageError } from '@/utils/constants/messageError';
import { getOffset, throwHttpError } from '@/utils/helpers';
import { CreateCarInput, UpdateCarInput } from './dto';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateCarInput) {
    await this.assertLicensePlateNotTaken(input.licensePlate);
    return this.prisma.car.create({ data: input });
  }

  async findAll(page: number, limit: number) {
    const [cars, total] = await this.prisma.$transaction([
      this.prisma.car.findMany({
        orderBy: { createdAt: 'desc' },
        skip: getOffset(page, limit),
        take: limit,
      }),
      this.prisma.car.count(),
    ]);
    return { cars, total };
  }

  async findOne(id: string) {
    const car = await this.prisma.car.findUnique({ where: { id } });
    if (!car) {
      throwHttpError(messageError.CAR_NOT_FOUND);
    }
    return car;
  }

  async update(id: string, input: UpdateCarInput) {
    await this.findOne(id);
    if (input.licensePlate) {
      await this.assertLicensePlateNotTaken(input.licensePlate, id);
    }
    return this.prisma.car.update({ where: { id }, data: input });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.car.delete({ where: { id } });
  }

  private async assertLicensePlateNotTaken(
    licensePlate: string,
    excludeId?: string
  ) {
    const existing = await this.prisma.car.findUnique({
      where: { licensePlate },
    });
    if (existing && existing.id !== excludeId) {
      throwHttpError(messageError.DUPLICATE_PLATE);
    }
  }
}
