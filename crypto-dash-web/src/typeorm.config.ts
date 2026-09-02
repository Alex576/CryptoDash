import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ObjectSubscriber } from './modules/cache/subscribers/object-subscriber';

export const getTypeOrmConfig = (configService: ConfigService): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') || process.env.DB_HOST,
  port: Number(configService.get<number>('DB_PORT') || process.env.DB_PORT),
  username: configService.get<string>('DB_USERNAME') || process.env.DB_USERNAME,
  password: configService.get<string>('DB_PASSWORD') || process.env.DB_PASSWORD,
  database: configService.get<string>('DB_NAME') || process.env.DB_NAME,

  // Автоматически искать файлы *.entity.ts по всему проекту
  entities: [__dirname + '/**/entities/*.{ts,js}'],
  migrations: [__dirname + '/database/migrations/*.{js,ts}', __dirname + '/database/*.{js,ts}'],

  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',

  subscribers: [ObjectSubscriber],

  synchronize: true,
  // logging: true, // Включает логирование SQL-запросов в консоль бэкенда
  cache: {
    type: 'ioredis',
    options: {
      host: configService.get<string>('REDIS_HOST') || process.env.REDIS_HOST,
      port: Number(configService.get<number>('REDIS_PORT') || process.env.REDIS_PORT),
    },
  },
});

const defaultConfigService = new ConfigService();
export default new DataSource(getTypeOrmConfig(defaultConfigService));
