import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../entities/tool';
import { ToolCode } from '../models/tool-code';

@Injectable()
export class ToolService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ToolService.name);

  constructor(
    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.fillTool();
  }

  async fillTool(): Promise<void> {
    this.logger.log('Checking Tool...');

    const count = await this.toolRepository.count();
    const currentEnumCount = Object.keys(ToolCode).length;
    if (count === currentEnumCount) {
      this.logger.log('Table Tool Contains data. Skip.');
      return;
    }

    this.logger.log('Table Tool is empty. Starting load data...');
    const dataToInsert: Pick<Tool, 'id' | 'name'>[] = [];
    const currentEntities = await this.toolRepository.find();

    Object.entries(ToolCode)
      .filter(([_, value]) => typeof value === 'number')
      .forEach(([key, value]) => {
        if (!currentEntities.find((x) => x.id === +value)) {
          dataToInsert.push({ id: +value, name: key });
        }
      });
    try {
      await this.toolRepository.insert(dataToInsert);
      this.logger.log(`Successful added ${dataToInsert.length} entities in Tool.`);
    } catch (error) {
      this.logger.error('Error while inserting Tool:', error);
    }
  }
}
