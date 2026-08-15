import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../crypto-engine/entities/subject';
import { SubjectData } from '../crypto-engine/entities/subject-data';
import { DataMigratorService } from './data-migrator.service';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Subject, SubjectData]), HttpModule],
  controllers: [],
  providers: [DataMigratorService],
  exports: [],
})
export class DataMigratorModule {}
