import { HttpStatus } from '@nestjs/common';

export const messageError = {
  CAR_NOT_FOUND: {
    code: 'CAR_NOT_FOUND',
    message: 'Car not found',
    status: HttpStatus.NOT_FOUND,
  },
  DUPLICATE_PLATE: {
    code: 'DUPLICATE_PLATE',
    message: 'License plate has already exists',
    status: HttpStatus.CONFLICT,
  },
};
