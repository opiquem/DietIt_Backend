import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDietToProductTable1704030843377 implements MigrationInterface {
    name = 'CreateDietToProductTable1704030843377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dietToProducts" ("id" SERIAL NOT NULL, "consumed" boolean NOT NULL DEFAULT false, "weight" integer NOT NULL, "dietId" integer, "productId" integer, CONSTRAINT "PK_f0ecf903e689cd2b946c3d38dd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dietToProducts" ADD CONSTRAINT "FK_9431d8ffeb5986dc15c5c02cdd8" FOREIGN KEY ("dietId") REFERENCES "diets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dietToProducts" ADD CONSTRAINT "FK_cc23cbffb72efcd7592c333258d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dietToProducts" DROP CONSTRAINT "FK_cc23cbffb72efcd7592c333258d"`);
        await queryRunner.query(`ALTER TABLE "dietToProducts" DROP CONSTRAINT "FK_9431d8ffeb5986dc15c5c02cdd8"`);
        await queryRunner.query(`DROP TABLE "dietToProducts"`);
    }

}
