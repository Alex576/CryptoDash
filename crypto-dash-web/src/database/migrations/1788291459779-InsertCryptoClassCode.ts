import { MigrationInterface, QueryRunner } from 'typeorm';
import { ClassEntity } from '../../modules/object-entities/entities/class-entity';
import { ClassCode } from '../../modules/object-entities/models/class-model';

export class InsertCryptoClassCode1788291459779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = queryRunner.manager.getRepository(ClassEntity);
    const entity = new ClassEntity();
    entity.id = ClassCode.Crypto;
    entity.name = ClassCode[ClassCode.Crypto];
    await repo.save(entity);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repo = queryRunner.manager.getRepository(ClassEntity);
    await repo.delete({ id: ClassCode.Crypto });
  }
}
