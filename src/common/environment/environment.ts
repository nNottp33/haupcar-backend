import { IEnvironment } from './environment.interface';

const ENV = process.env;

export const environment = (): IEnvironment => ({
  app: {
    APP_NODE_ENV: ENV.APP_NODE_ENV || 'development',
    APP_PORT: Number(ENV.APP_PORT) || 3000,
    APP_PREFIX: ENV.APP_PREFIX || 'api',
  },
  db: {
    DATABASE_URL: ENV.DATABASE_URL || '',
  },
});
