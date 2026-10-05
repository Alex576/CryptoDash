import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DashboardChartLayoutRequest, DashboardChartLayoutResponse } from './models/chart-models';
import { LayoutDataType } from './models/layout-model';
import { ToolCode } from './models/tool-code';
import { LayoutService } from './services/layout.service';

@Controller('layout')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @Get('getLayout')
  async getLayout(@Query('tool') tool: ToolCode): Promise<LayoutDataType> {
    return await this.layoutService.getLayout(tool);
  }

  // @Post('saveLayout')
  // async saveLayout(@Body() model: SaveLayoutRequest): Promise<void> {
  //   await this.layoutService.saveLayout(model.tool, model.layout);
  // }

  // @Post('addLayoutItem')
  // async addLayoutItem(@Body() model: AddLayoutItemRequest): Promise<AddLayoutItemResponse> {
  //   return await this.layoutService.addLayoutItem(model.tool, model.type);
  // }

  @Post('getChartData')
  async getChartData(@Body() model: DashboardChartLayoutRequest): Promise<DashboardChartLayoutResponse | null> {
    return await this.layoutService.getChartData(model.id, model.toolCode);
  }
}
