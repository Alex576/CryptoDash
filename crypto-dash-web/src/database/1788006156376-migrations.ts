import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1788006156376 implements MigrationInterface {
  name = 'Migrations1788006156376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "layout" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "layout" ADD "mpath" character varying DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "layout" ADD "parentId" integer`);
    await queryRunner.query(`ALTER TABLE "layout" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "layout_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "layout" ADD CONSTRAINT "FK_02de675b9d52beca12d6e002fa9" FOREIGN KEY ("parentId") REFERENCES "layout"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "layout" DROP CONSTRAINT "FK_02de675b9d52beca12d6e002fa9"`);
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "layout_id_seq" OWNED BY "layout"."id"`);
    await queryRunner.query(`ALTER TABLE "layout" ALTER COLUMN "id" SET DEFAULT nextval('"layout_id_seq"')`);
    await queryRunner.query(`ALTER TABLE "layout" DROP COLUMN "parentId"`);
    await queryRunner.query(`ALTER TABLE "layout" DROP COLUMN "mpath"`);
    await queryRunner.query(`ALTER TABLE "layout" DROP COLUMN "name"`);
  }
}
