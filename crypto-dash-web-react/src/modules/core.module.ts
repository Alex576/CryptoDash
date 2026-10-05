import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { getRedis } from '../redis-instance';
import { REDIS } from '../redis-provider';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Redis => getRedis(configService),
    },
  ],
  exports: [REDIS],
})
export class CoreModule {}
