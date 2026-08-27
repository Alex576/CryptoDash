import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../crypto-engine/entities/subject';
import { SubjectData } from '../crypto-engine/entities/subject-data';
import { DataMigratorService } from './data-migrator.service';
import { SubjectHistory } from './entities/subject-history';
import { SupportedVsCurrency } from './entities/supported-vs-currencies';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Subject, SubjectData, SupportedVsCurrency, SubjectHistory]),
    HttpModule,
  ],
  controllers: [],
  providers: [DataMigratorService],
  exports: [],
})
export class DataMigratorModule {}
