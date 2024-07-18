import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';
const envFile = isProd ? '.prod.env' : '.dev.env';
const entitiesPath = isProd ? 'dist/apps/backend/src/app/db/entities/*.entity.ts' : 'apps/backend/src/app/db/entities/*.entity.ts';
const migrationsPath = isProd ? 'dist/apps/backend/src/app/db/migrations/*.js' : 'apps/backend/src/app/db/migrations/*.js';

dotenv.config({ path: envFile });

export const options = {
  serviceName: process.env.DB_SERVICE_NAME,
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [ entitiesPath ],
  migrations: [ migrationsPath ],
  migrationsTableName: "migrations",
  synchronize: false,
}

export default new DataSource(options)