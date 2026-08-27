import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlType } from '../../share/form';
import { SettingsControlsBuilderService } from '../controls-builder/services/settings-controls-builder.service';
import { Tool } from '../layout/entities/tool';
import {
  ControlItemCode,
  ControlState,
  FormControlData,
  FormControlDataSettings,
} from '../layout/models/control-models';
import { ToolCode } from '../layout/models/tool-code';
import { ToolModel } from '../layout/models/tool-model';
import { SettingsLayout } from './models/settings-layout';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,
    private readonly builder: SettingsControlsBuilderService,
  ) {}

  async getFilters(toolCode: ToolCode | undefined): Promise<SettingsLayout> {
    const tools: ToolModel[] = (await this.toolRepository.find()).map((x) => ({ id: x.id, name: x.name }));
    const controlsData: FormControlData[] = [
      {
        name: 'Control.Name.Tool',
        type: ControlType.Combo,
        controlItemCode: ControlItemCode.Tool,
        states: [ControlState.Required, ControlState.SelectFirstValueIfEmpty],
        settings: {} as FormControlDataSettings,
      },
    ];
    return {
      toolFilter: this.builder.getFilters(toolCode, controlsData, { objs: [], tools })[0],
    };
  }

  async getLayout(toolCode: ToolCode): Promise<SettingsLayout> {
    const tools: ToolModel[] = (await this.toolRepository.find()).map((x) => ({ id: x.id, name: x.name }));
    const controlsData: FormControlData[] = [
      {
        name: 'Control.Tool',
        type: ControlType.Combo,
        controlItemCode: ControlItemCode.Tool,
        states: [],
        settings: {} as FormControlDataSettings,
      },
    ];
    return {
      toolFilter: this.builder.getFilters(toolCode, controlsData, { objs: [], tools })[0],
    };
  }
}
