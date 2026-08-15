import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { CryptoEngineModule } from './modules/crypto-engine/crypto-engine.module';
import { DataMigratorModule } from './modules/data-migrator/data-migrator.module';
import { PortfoliosModule } from './modules/portfolios/portfolios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CryptoEngineModule,
    PortfoliosModule,
    AuthModule,
    DataMigratorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),

        // Автоматически искать файлы *.entity.ts по всему проекту
        entities: [__dirname + '/**/entities/*.{ts,js}'],

        // Авто-синхронизация схем.
        // ВНИМАНИЕ: Для продакшена ставьте false и используйте миграции.
        // Для локального пет-проекта на этапе разработки true — это нормально (как EnsureCreated в EF Core).
        synchronize: true,

        logging: true, // Включает логирование SQL-запросов в консоль бэкенда
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
