import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseModel } from '@/common/models';

export class CarModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  licensePlate: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  model: string;

  @ApiProperty({ required: false, nullable: true })
  notes: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CarResponseModel extends BaseResponseModel {
  @ApiProperty({ type: CarModel })
  data: CarModel;
}

export class CarListResponseModel extends BaseResponseModel {
  @ApiProperty({ type: [CarModel] })
  data: CarModel[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
