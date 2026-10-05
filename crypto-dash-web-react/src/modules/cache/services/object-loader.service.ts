import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { REDIS } from '../../../redis-provider';
import { ObjectEntity } from '../../object-entities/entities/object-entity';
import { CacheConstants } from '../cache-constants';
import { getSpentTimeString } from '../helper';
import { RedisValue } from '../redis-value';

@Injectable()
export class ObjectLoaderService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ObjectLoaderService.name);

  constructor(
    @InjectRepository(ObjectEntity)
    private readonly objRepository: Repository<ObjectEntity>,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  async onApplicationBootstrap() {
    const start = Date.now();
    this.logger.log('Start filling obj storage...');

    try {
      const dataStream = this.redis.scanStream({
        match: CacheConstants.OBJ_BY_ID_CLASS('*', '*'),
        count: 1000,
      });
      const toDelete: string[] = [];
      const pipeline = this.redis.pipeline();

      for await (const keys of dataStream as AsyncIterable<string[]>) {
        if (keys.length) {
          toDelete.push(...keys);
        }
      }
      pipeline.del(...toDelete);

      const allObjects = await this.objRepository.find();
      for (let i = 0; i < allObjects.length; i++) {
        const obj = allObjects[i];
        const key = CacheConstants.OBJ_BY_ID_CLASS(obj.id, obj.classId);
        const value: RedisValue = {
          identifier: key,
          time: start,
          duration: CacheConstants.DURATION,
          result: [obj],
        };
        pipeline.set(key, JSON.stringify(value));
        pipeline.sadd(CacheConstants.OBJ_INDEX_BY_ID(obj.id), key);
        pipeline.sadd(CacheConstants.OBJ_INDEX_BY_CLASS(obj.classId), key);
      }
      await pipeline.exec();
      this.logger.log(`End of filling obj storage, added ${allObjects.length}, duration: ${getSpentTimeString(start)}`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
