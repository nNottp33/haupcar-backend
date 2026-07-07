export interface IEnvironment {
  app: IAppEnv;
  db: IDbEnv;
}

export interface IAppEnv {
  APP_PORT: number;
  APP_PREFIX: string;
  APP_NODE_ENV: string;
}

export interface IDbEnv {
  DATABASE_URL: string;
}
