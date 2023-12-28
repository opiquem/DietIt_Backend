import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDiets1703790960027 implements MigrationInterface {
  name = 'CreateDiets1703790960027'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "diets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "calories" integer, "userId" integer, CONSTRAINT "PK_c085586cdf7916cadcad4c619d3" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "diets" ADD CONSTRAINT "FK_264d7aeb1ded3c0881d5be7ff8b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "diets" DROP CONSTRAINT "FK_264d7aeb1ded3c0881d5be7ff8b"`);
    await queryRunner.query(`DROP TABLE "diets"`);
  }

}
