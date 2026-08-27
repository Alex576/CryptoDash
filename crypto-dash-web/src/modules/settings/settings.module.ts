import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlsBuilderModule } from '../controls-builder/controls-builder.module';
import { Tool } from '../layout/entities/tool';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tool]), ControlsBuilderModule],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [],
})
export class SettingsModule {}
