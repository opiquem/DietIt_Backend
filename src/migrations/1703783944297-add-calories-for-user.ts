import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCaloriesForUser1703783944297 implements MigrationInterface {
  name = 'AddCaloriesForUser1703783944297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "calories" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "calories"`);
  }
}
