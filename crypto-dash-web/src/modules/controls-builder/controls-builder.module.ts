import { Module } from '@nestjs/common';
import { DashboardControlsBuilderService } from './services/dashboard-controls-builder.service';
import { SettingsControlsBuilderService } from './services/settings-controls-builder.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SettingsControlsBuilderService, DashboardControlsBuilderService],
  exports: [SettingsControlsBuilderService],
})
export class ControlsBuilderModule {}
