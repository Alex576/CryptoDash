import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Layout } from './entities/layout';
import { LayoutType } from './entities/layout-type';
import { Tool } from './entities/tool';
import { LayoutController } from './layout.controller';
import { LayoutService } from './services/layout.service';
import { ToolService } from './services/tool.service';

@Module({
  imports: [TypeOrmModule.forFeature([LayoutType, Layout, Tool])],
  controllers: [LayoutController],
  providers: [ToolService, LayoutService],
  exports: [],
})
export class LayoutModule {}
