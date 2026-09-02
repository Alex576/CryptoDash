import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { REDIS } from '../../../redis-provider';
import { ObjectEntity } from '../../object-entities/entities/object-entity';
import { CacheConstants } from '../cache-constants';
import { RedisValue } from '../redis-value';

@Injectable()
export class ObjectStorage {
  private readonly logger = new Logger(ObjectStorage.name);

  constructor(
    @Inject(REDIS) private readonly redis: Redis,
    @InjectRepository(ObjectEntity)
    private readonly objRepo: Repository<ObjectEntity>,
  ) {}

  async getObj(id: number): Promise<ObjectEntity> {
    try {
      const key = CacheConstants.OBJ_INDEX_BY_ID(id);
      const cacheObj = await this.redis.get(key);
      if (cacheObj) {
        return JSON.parse(cacheObj) as ObjectEntity;
      }
    } catch (error) {
      this.logger.error(error);
    }

    const dbObject = await this.objRepo.findOne({ where: { id } });
    await this.saveObjInRedis(id, dbObject);
    return dbObject;
  }

  private async saveObjInRedis(id: number, dbObject: ObjectEntity) {
    const pipeline = this.redis.pipeline();

    const key = CacheConstants.OBJ_BY_ID_CLASS(id, dbObject.classId);
    const value: RedisValue = {
      identifier: key,
      time: Date.now(),
      duration: CacheConstants.DURATION,
      result: [dbObject],
    };
    pipeline.set(key, JSON.stringify(value));
    pipeline.sadd(CacheConstants.OBJ_INDEX_BY_ID(dbObject.id), key);
    pipeline.sadd(CacheConstants.OBJ_INDEX_BY_CLASS(dbObject.classId), key);
    await pipeline.exec();
  }
}
