import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DashboardLayout } from '../../settings/models/settings-layout';
import { Layout } from '../entities/layout';
import { LayoutType } from '../entities/layout-type';
import { DashboardChartLayoutResponse } from '../models/chart-models';
import { DashboardChartLayout } from '../models/layout-model';
import { LayoutTypeCode } from '../models/layout-type-code';
import { ToolCode } from '../models/tool-code';

@Injectable()
export class LayoutService implements OnApplicationBootstrap {
  private readonly logger = new Logger(LayoutService.name);

  constructor(
    @InjectRepository(LayoutType)
    private readonly layoutTypeDataRepository: Repository<LayoutType>,
    @InjectRepository(Layout)
    private readonly layoutDataRepository: Repository<Layout>,
    private readonly dataSource: DataSource,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.fillLayoutType();
  }

  async fillLayoutType(): Promise<void> {
    this.logger.log('Checking LayoutType...');

    const count = await this.layoutTypeDataRepository.count();
    const currentEnumCount = Object.keys(LayoutTypeCode).filter((x) => isNaN(Number(x))).length;
    if (count === currentEnumCount) {
      this.logger.log('Table LayoutType Contains data. Skip.');
      return;
    }

    this.logger.log('Table LayoutType is not up to date. Starting load data...');
    const dataToInsert: Pick<LayoutType, 'id' | 'name'>[] = [];
    const currentEntities = await this.layoutTypeDataRepository.find();
    Object.entries(LayoutTypeCode)
      .filter(([_, value]) => typeof value === 'number')
      .forEach(([key, value]) => {
        if (!currentEntities.find((x) => x.id === +value)) {
          dataToInsert.push({ id: +value, name: key });
        }
      });
    try {
      await this.layoutTypeDataRepository.insert(dataToInsert);
      this.logger.log(`Successful added ${dataToInsert.length} entities in LayoutType.`);
    } catch (error) {
      this.logger.error('Error while inserting LayoutType:', error);
    }
  }

  async getLayout<T extends DashboardLayout = DashboardLayout>(tool: ToolCode): Promise<T> {
    const layout = await this.layoutDataRepository.findOne({
      where: { toolId: tool, typeId: LayoutTypeCode.Layout },
    });
    return (layout?.options.data as T) ?? (this.getDefaultLayout() as T);
  }

  // async saveLayout<T extends DashboardLayout = DashboardLayout>(tool: ToolCode, layout: T): Promise<void> {
  //   const data =
  //     (await this.layoutDataRepository.findOne({
  //       where: { toolId: tool, typeId: LayoutTypeCode.Layout },
  //     })) ?? this.layoutDataRepository.create();

  //   data.options.data = layout;
  //   await this.layoutDataRepository.save(data);
  // }

  // async addLayoutItem(tool: ToolCode, type: DashboardTypeCode): Promise<AddLayoutItemResponse> {
  //   const layout =
  //     (await this.layoutDataRepository.findOneBy({ toolId: tool, typeId: LayoutTypeCode.Layout })) ??
  //     this.layoutDataRepository.create({ options: {}, typeId: LayoutTypeCode.Layout, toolId: tool });

  //   let data: DashboardLayout;
  //   if (!layout.options.data) {
  //     data = this.getDefaultLayout();
  //     layout.options.data = data;
  //   } else {
  //     data = layout.options.data as DashboardLayout;
  //   }

  //   const layoutType = LayoutTypeCode.DashboardItem; // this.getLayoutTypeCode(type);
  //   const chartEntity = this.layoutDataRepository.create({
  //     toolId: tool,
  //     options: {},
  //     typeId: layoutType,
  //   });
  //   const emptyData: LayoutDataType | null = getEmptyData(DashboardTypeCode.Chart); //todo add param!

  //   if (!emptyData) {
  //     this.logger.error(`Not implemented type ${layoutType}`);
  //     throw new NotImplementedException();
  //   }

  //   chartEntity.options.data = emptyData;
  //   const options: BaseDashboardItem = {
  //     options: {
  //       x: 0,
  //       y: 0,
  //       width: 12, // Math.round(data.layout.cols.lg / 3),
  //       height: 8, // Math.round(data.layout.rowHeight / 5),
  //     },
  //     type: type,
  //     id: -1,
  //   };
  //   await this.dataSource.transaction(async (manager) => {
  //     const savedEntity = await manager.save(Layout, chartEntity);
  //     options.id = savedEntity.id;
  //     data.items.push(options);
  //     await manager.save(Layout, layout);
  //   });
  //   return { options: options, id: options.id, type: options.type };

  //   function getEmptyData(type: DashboardTypeCode): LayoutDataType | null {
  //     switch (type) {
  //       // case LayoutTypeCode.DashboardLayout:
  //       case DashboardTypeCode.Chart:
  //         return getEmptyChartData();
  //       case DashboardTypeCode.Table:
  //         return {} as DashboardTableLayout; //todo
  //       default:
  //         return null;
  //     }
  //   }

  //   function getEmptyChartData(): DashboardChartLayout {
  //     return {
  //       type: ChartType.Bars,
  //     };
  //   }
  // }

  async getChartData(id: number, tool: ToolCode): Promise<DashboardChartLayoutResponse | null> {
    const chartEntity = await this.layoutDataRepository.findOne({ where: { id: id, toolId: tool } });
    if (!chartEntity?.options.data) return null;
    const chart = chartEntity.options.data as DashboardChartLayout;
    return { id: id, tool: tool };
  }

  private getDefaultLayout(): DashboardLayout {
    return {
      items: [],
      layout: {
        cols: { lg: 32, md: 26, sm: 20, xs: 12, xxs: 6 },
        rowHeight: 40,
      },
    };
  }

  // private getLayoutTypeCode(type: DashboardItemType): LayoutTypeCode {
  //   switch (type) {
  //     case DashboardItemType.Chart:
  //       return LayoutTypeCode.DashboardChartLayout;
  //     case DashboardItemType.Table:
  //       return LayoutTypeCode.DashboardTableLayout;
  //   }
  // }
}

// async function fillEntity<TableEntity extends object, K extends keyof TableEntity>(
//   logger: Logger,
//   fields: K[],
//   repository: Repository<TableEntity>,
//   data: Promise<Pick<TableEntity, K>[]> | Pick<TableEntity, K>[],
// ): Promise<void> {
//   logger.log(`Checking ${TableEntity.name}...`);

//   const count = await repository.count();
//   if (count > 0) {
//     logger.log(`Table ${TableEntity.name} Contains data. Skip.`);
//     return;
//   }

//   logger.log(`Table ${TableEntity.name} is empty. Starting load data...`);
//   const dataToInsert: Pick<TableEntity, K>[] = [];

//   try {
//     await repository.insert(dataToInsert);
//     logger.log(`Successful added ${dataToInsert.length} entities in ${TableEntity.name}.`);
//   } catch (error) {
//     logger.error(`Error while inserting ${TableEntity.name}:`, error);
//   }
// }
