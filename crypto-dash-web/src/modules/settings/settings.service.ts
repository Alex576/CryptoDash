import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DashboardFormSettingsBuilder } from '../builders/layout-builders/dashboard-form-settings-layout-builder';
import { ControlType, Form } from '../builders/models/form';
import { FormValues } from '../builders/models/form-data';
import { SettingsControlsBuilderService } from '../builders/services/control-services/settings-controls-builder.service';
import { SettingsDashboardFormBuilder } from '../builders/services/form-builders/settings-dashboard-form-builder';
import { ObjectStorage } from '../cache/storages/object-storage.service';
import { Layout } from '../layout/entities/layout';
import { Tool } from '../layout/entities/tool';
import { FormLayout } from '../layout/models/layout-model';
import { LayoutTypeCode } from '../layout/models/layout-type-code';
import { ToolCode } from '../layout/models/tool-code';
import { ToolModel } from '../layout/models/tool-model';
import { Constant } from './models/constants';
import { FormControlData } from './models/control-models';
import { ControlState } from './models/control-state';
import { FormControlDataSettings } from './models/form-control-data.settings';
import { SettingFilters } from './models/setting-filters';
import { DashboardLayout, SettingLayoutData, SettingsFormData, SettingsLayout } from './models/settings-layout';
import { TileItemCode } from './models/tile-item-code';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,
    @InjectRepository(Layout)
    private readonly layoutRepository: Repository<Layout>,
    private readonly dataSource: DataSource,
    private readonly builder: SettingsControlsBuilderService,
    private readonly objStorage: ObjectStorage,
  ) {}

  async getFilters(toolCode: ToolCode | undefined): Promise<SettingFilters> {
    const tools: ToolModel[] = (await this.toolRepository.find()).map((x) => ({ id: x.id, name: x.name }));
    const controlsData: FormControlData[] = [
      {
        customId: Constant.TOOL_FILTER_ID,
        name: 'Control.Name.Tool',
        type: ControlType.Combo,
        tileItemCode: TileItemCode.Tool,
        states: [ControlState.Required, ControlState.SelectFirstValueIfEmpty],
        settings: {} as FormControlDataSettings,
      },
    ];
    return {
      toolFilter: this.builder.getFilters(toolCode, controlsData, { objs: [], tools })[0],
    };
  }

  async getLayout(toolCode: ToolCode): Promise<SettingsLayout> {
    const treeRepo = this.dataSource.getTreeRepository(Layout);
    const rootNode = await treeRepo.findOne({ where: { toolId: toolCode, typeId: LayoutTypeCode.Layout } });

    const layoutStructure = await treeRepo.findDescendantsTree(rootNode);

    const layout: SettingsLayout = { items: [] };
    for (let i = 0; i < layoutStructure.children.length; i++) {
      const child = layoutStructure.children[i];
      const data = this.getLayoutData(child, toolCode);
      layout.items.push({ type: child.typeId, data });
    }
    return layout;
  }

  private getLayoutData(layout: Layout, toolCode: ToolCode): SettingLayoutData {
    switch (layout.typeId) {
      case LayoutTypeCode.Layout:
      case LayoutTypeCode.Form: {
        let formLayout: FormLayout;
        if (layout.options.data) {
          formLayout = layout.options.data as FormLayout;
        } else {
          formLayout = { controls: [] };
        }
        const controls = this.builder.getControlsPreview(formLayout.controls);
        const data: SettingsFormData = {
          form: { controls },
        };
        return data;
      }
      case LayoutTypeCode.Filter:
      case LayoutTypeCode.Table:
      case LayoutTypeCode.Dashboard: {
        let dashboardLayout: DashboardLayout;
        if (layout.options?.data) {
          dashboardLayout = layout.options.data as DashboardLayout;
        } else {
          dashboardLayout = { items: [], layout: { cols: null, rowHeight: null } };
        }
        const data: DashboardLayout = {
          layout: dashboardLayout.layout,
          items: dashboardLayout.items,
        };
        return dashboardLayout;
      }
      case LayoutTypeCode.DashboardItem:
      default:
        break;
    }
  }

  getForm(toolCode: ToolCode, formValues?: FormValues): Form {
    if (toolCode === ToolCode.Dashboard) {
      const layoutBuilder = new DashboardFormSettingsBuilder();
      const formBuilder = new SettingsDashboardFormBuilder(layoutBuilder.buildControls(), this.objStorage);
      return formBuilder.getForm(formValues);
    }
    // const layout = await this.layoutRepository.findOneBy({ toolId: toolCode, typeId: LayoutTypeCode.Form });

    // throw new Error('Method not implemented.');
  }
}
