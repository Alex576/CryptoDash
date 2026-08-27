import { Body, Controller, Post } from '@nestjs/common';
import { GetSettingsFiltersModel } from './models/get-settings-filters-model';
import { GetSettingsLayoutModel } from './models/get-settings-layout-model';
import { SettingsLayout } from './models/settings-layout';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post('getFilters')
  async getFilters(@Body() model: GetSettingsFiltersModel): Promise<SettingsLayout> {
    return await this.settingsService.getFilters(model.toolCode);
  }

  @Post('getLayout')
  async getLayout(@Body() model: GetSettingsLayoutModel): Promise<SettingsLayout> {
    return await this.settingsService.getLayout(model.toolCode);
  }
}
