import { HttpException, HttpStatus } from '@nestjs/common';

export interface IMessageError {
  code: string;
  message: string;
  status: HttpStatus;
}

export function throwHttpError(error: IMessageError): never {
  throw new HttpException(error, error.status);
}
