import path from 'path';
import { DataSource } from 'typeorm';
import { DB_DATABASE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } from '@/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: false,
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../../migrations/*{.ts,.js}')],
});
