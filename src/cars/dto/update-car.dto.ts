import { PartialType } from '@nestjs/swagger';
import { CreateCarInput } from './create-car.dto';

export class UpdateCarInput extends PartialType(CreateCarInput) {}
