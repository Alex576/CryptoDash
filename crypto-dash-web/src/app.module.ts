import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { CacheModule } from './modules/cache/cache.module';
import { CoreModule } from './modules/core.module';
import { CryptoEngineModule } from './modules/crypto-engine/crypto-engine.module';
import { DataMigratorModule } from './modules/data-migrator/data-migrator.module';
import { LayoutModule } from './modules/layout/layout.module';
import { ObjectEntitiesModule } from './modules/object-entities/object-entities.module';
import { PortfoliosModule } from './modules/portfolios/portfolios.module';
import { SettingsModule } from './modules/settings/settings.module';
import { getTypeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    CoreModule,
    CacheModule,
    ObjectEntitiesModule,
    // ControlsBuilderModule,
    SettingsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LayoutModule,
    CryptoEngineModule,
    PortfoliosModule,
    AuthModule,
    DataMigratorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getTypeOrmConfig(configService),
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
