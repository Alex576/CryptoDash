import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoEngineController } from './crypto-engine.controller';
import { CryptoEngineService } from './crypto-engine/crypto-engine.service';
import { Subject } from './entities/subject';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [CryptoEngineController],
  providers: [CryptoEngineService],
  exports: [],
})
export class CryptoEngineModule {}
