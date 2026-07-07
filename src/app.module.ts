import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [CommonModule, CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
