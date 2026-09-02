import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectEntity } from '../object-entities/entities/object-entity';
import { ObjectLoaderService } from './services/object-loader.service';
import { ObjectStorage } from './storages/object-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectEntity])],
  controllers: [],
  providers: [ObjectLoaderService, ObjectStorage],
  exports: [ObjectStorage],
})
export class CacheModule {}
