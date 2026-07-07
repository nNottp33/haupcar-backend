import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IAppEnv } from '@/common/environment/environment.interface';
import { HttpExceptionFilter } from '@/common/filters';
import { TrimPipe } from '@/utils/pipes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { APP_PORT, APP_PREFIX } = configService.get<IAppEnv>('app')!;

  app.setGlobalPrefix(APP_PREFIX);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new TrimPipe(),
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessage = errors
          .map((e) => Object.values(e.constraints ?? {}).join(', '))
          .join(', ');

        return new BadRequestException(errorMessage);
      },
    })
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Haupcar API')
    .setDescription('REST API for managing company car records')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${APP_PREFIX}/docs`, app, swaggerDocument);

  await app.listen(APP_PORT, () =>
    Logger.log(
      `Running on http://localhost:${APP_PORT}/${APP_PREFIX}`,
      'Bootstrap'
    )
  );
}

bootstrap();
