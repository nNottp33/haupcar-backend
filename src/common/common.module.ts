import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './environment/environment.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EnvironmentConfigModule, DatabaseModule],
})
export class CommonModule {}
