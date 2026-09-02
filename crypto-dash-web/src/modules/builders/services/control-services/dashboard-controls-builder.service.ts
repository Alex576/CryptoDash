import { Injectable } from '@nestjs/common';
import { LayoutTypeCode } from '../../../layout/models/layout-type-code';
import { ToolCode } from '../../../layout/models/tool-code';
import { FormControlData } from '../../../settings/models/control-models';
import { FormControl, Item } from '../../models/form';
import { BaseControlsBuilderService } from './base-controls-builder.service';

@Injectable()
export class DashboardControlsBuilderService extends BaseControlsBuilderService {
  getComboItems(): Item[] {
    throw new Error('Method not implemented.');
  }
  getFilters(tool: ToolCode | undefined, controls: FormControlData[], data: unknown): FormControl[] {
    throw new Error('Method not implemented.');
  }
  getControls(tool: ToolCode, layoutCode: LayoutTypeCode) {
    throw new Error('Method not implemented.');
  }
}
