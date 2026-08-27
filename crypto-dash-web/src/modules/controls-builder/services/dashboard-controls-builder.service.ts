import { Injectable } from '@nestjs/common';
import { FormControl, Item } from '../../../share/form';
import { FormControlData } from '../../layout/models/control-models';
import { LayoutTypeCode } from '../../layout/models/layout-type-code';
import { ToolCode } from '../../layout/models/tool-code';
import { BaseControlsBuilderService } from './base-controls-builder.service';

@Injectable()
export class DashboardControlsBuilderService extends BaseControlsBuilderService {
  getComboItems(): Item[] {
    throw new Error('Method not implemented.');
  }
  getFilters(tool: ToolCode | undefined, controls: FormControlData[], data: unknown): FormControl[] {
    throw new Error('Method not implemented.');
  }
  getFormControls(tool: ToolCode, layoutCode: LayoutTypeCode) {
    throw new Error('Method not implemented.');
  }
}
