import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: unknown) {
    if (typeof value === 'object' && value !== null) {
      const obj = value as Record<string, unknown>;
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (typeof val === 'string') {
          obj[key] = val.trim();
        }
      });
    }
    return value;
  }
}
