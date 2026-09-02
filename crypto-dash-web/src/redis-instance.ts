import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

let redisInstance: Redis = null;

export function getRedis(configService: ConfigService): Redis {
  if (!redisInstance) {
    redisInstance = new Redis({
      host: configService.get<string>('REDIS_HOST') || process.env.REDIS_HOST,
      port: Number(configService.get<number>('REDIS_PORT') || process.env.REDIS_PORT),
    });
    return redisInstance;
  }
}
