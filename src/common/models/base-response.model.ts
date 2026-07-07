import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseModel {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
