import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildersModule } from '../builders/builders.module';
import { CacheModule } from '../cache/cache.module';
import { Layout } from '../layout/entities/layout';
import { Tool } from '../layout/entities/tool';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tool, Layout]), BuildersModule, CacheModule],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [],
})
export class SettingsModule {}
