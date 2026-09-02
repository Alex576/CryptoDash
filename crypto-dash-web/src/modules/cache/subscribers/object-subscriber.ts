import { Inject, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { REDIS } from '../../../redis-provider';
import { ObjectEntity } from '../../object-entities/entities/object-entity';
import { CacheConstants } from '../cache-constants';
import { RedisValue } from '../redis-value';

@EventSubscriber()
export class ObjectSubscriber implements EntitySubscriberInterface {
  private readonly logger = new Logger(ObjectSubscriber.name);

  constructor(@Inject(REDIS) private readonly redis: Redis) {}
  listenTo() {
    return ObjectEntity;
  }

  async afterInsert(event: InsertEvent<ObjectEntity>): Promise<any> {
    const entity = event.entity;
    if (!entity?.id) return;

    await this.updateCacheEntity(entity);
  }

  async afterUpdate(event: UpdateEvent<ObjectEntity>): Promise<any> {
    const entity = event.entity;
    if (!entity?.id) return;

    //todo mb event.databaseEntity enough
    const updatedEntity = await event.manager.getRepository(ObjectEntity).findOneBy({
      id: entity.id || event.databaseEntity?.id,
    });

    await this.updateCacheEntity(updatedEntity);
  }

  private async updateCacheEntity(entity: ObjectEntity) {
    try {
      const key = CacheConstants.OBJ_BY_ID_CLASS(entity.id, entity.classId);
      const cacheData: RedisValue = {
        identifier: key,
        time: Date.now(),
        duration: CacheConstants.DURATION,
        result: [entity],
      };
      const pipeline = this.redis.pipeline();

      pipeline.set(key, JSON.stringify(cacheData));
      pipeline.sadd(CacheConstants.OBJ_INDEX_BY_ID(entity.id), key);
      pipeline.sadd(CacheConstants.OBJ_INDEX_BY_CLASS(entity.classId), key);
      await pipeline.exec();
    } catch (error) {
      this.logger.error(error);
    }
  }

  //todo check on work in future!!
  async afterRemove(event: RemoveEvent<ObjectEntity>): Promise<any> {
    try {
      if (event.entityId) {
        if (Array.isArray(event.entityId)) {
          const pipeline = this.redis.pipeline();
          const ids = event.entityId.filter((x) => typeof x === 'number' || typeof x === 'string');
          for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const key = CacheConstants.OBJ_BY_ID_CLASS(id, event.databaseEntity.classId);
            pipeline.del(key);
            pipeline.srem(CacheConstants.OBJ_INDEX_BY_ID(id), key);
            pipeline.srem(CacheConstants.OBJ_INDEX_BY_CLASS(event.databaseEntity.classId), key);
          }

          await pipeline.exec();
        } else if (typeof event.entityId === 'number' || typeof event.entityId === 'string') {
          const pipeline = this.redis.pipeline();

          const key = CacheConstants.OBJ_BY_ID_CLASS(event.entityId, event.databaseEntity.classId);
          pipeline.del(key);
          pipeline.srem(CacheConstants.OBJ_INDEX_BY_ID(event.entityId), key);
          pipeline.srem(CacheConstants.OBJ_INDEX_BY_CLASS(event.databaseEntity.classId), key);
          await pipeline.exec();
        }
      } else if (event.databaseEntity?.id) {
        const key = CacheConstants.OBJ_BY_ID_CLASS(event.databaseEntity.id, event.databaseEntity.classId);
        const pipeline = this.redis.pipeline();

        pipeline.del(key);
        pipeline.srem(CacheConstants.OBJ_INDEX_BY_ID(event.databaseEntity.id), key);
        pipeline.srem(CacheConstants.OBJ_INDEX_BY_CLASS(event.databaseEntity.classId), key);
        await pipeline.exec();
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
