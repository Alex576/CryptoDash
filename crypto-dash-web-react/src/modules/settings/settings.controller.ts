import { Body, Controller, Post } from '@nestjs/common';

import { Form } from '../builders/models/form';
import { GetSettingsFiltersModel } from './models/get-settings-filters-model';
import { GetSettingsFormModel, SaveSettingsFormModel } from './models/get-settings-form-model';
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
  async getForm(@Body() model: GetSettingsFormModel): Promise<Form> {
    return await this.settingsService.getForm(model.toolCode, model.dashboardId);
  }

  @Post('updateForm')
  async updateForm(@Body() model: GetSettingsFormModel): Promise<Form> {
    return await this.settingsService.getForm(model.toolCode, model.dashboardId, model.formValues);
  }

  @Post('saveForm')
  async saveForm(@Body() model: SaveSettingsFormModel): Promise<void> {
    return await this.settingsService.saveForm(model.toolCode, model.dashboardId, model.formValues);
  }
}
