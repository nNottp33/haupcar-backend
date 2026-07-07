import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = exception.getStatus();
    const body = exception.getResponse();

    let message: string | string[];
    let code: string | undefined;
    if (typeof body === 'string') {
      message = body;
    } else {
      ({ message, code } = body as {
        message: string | string[];
        code?: string;
      });
    }

    response.status(statusCode).json({
      statusCode,
      message: Array.isArray(message) ? message.join(', ') : message,
      code: code ?? HttpStatus[statusCode],
    });
  }
}
