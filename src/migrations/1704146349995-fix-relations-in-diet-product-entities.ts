import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelationsInDietProductEntities1704146349995 implements MigrationInterface {
    name = 'FixRelationsInDietProductEntities1704146349995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diets" ALTER COLUMN "calories" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "diets" ALTER COLUMN "calories" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diets" ALTER COLUMN "calories" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "diets" ALTER COLUMN "calories" DROP DEFAULT`);
    }

}
