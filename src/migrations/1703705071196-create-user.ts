import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1703705071196 implements MigrationInterface {
  name = 'CreateUser1703705071196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "height" integer NOT NULL, "weight" integer NOT NULL, "password" character varying NOT NULL, "role" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
