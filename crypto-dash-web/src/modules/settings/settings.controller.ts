import { Body, Controller, Post } from '@nestjs/common';

import { Form } from '../builders/models/form';
import { GetSettingsFiltersModel } from './models/get-settings-filters-model';
import { GetSettingsFormModel } from './models/get-settings-form-model';
import { GetSettingsLayoutModel } from './models/get-settings-layout-model';
import { SettingFilters } from './models/setting-filters';
import { SettingsLayout } from './models/settings-layout';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post('getFilters')
  async getFilters(@Body() model: GetSettingsFiltersModel): Promise<SettingFilters> {
    return await this.settingsService.getFilters(model.toolCode);
  }

  @Post('getLayout')
  async getLayout(@Body() model: GetSettingsLayoutModel): Promise<SettingsLayout> {
    return await this.settingsService.getLayout(model.toolCode);
  }

  @Post('getForm')
  getForm(@Body() model: GetSettingsFormModel): Form {
    return this.settingsService.getForm(model.toolCode, model.formValues);
  }
}
