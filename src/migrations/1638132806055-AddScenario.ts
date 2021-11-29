import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddScenario1638132806055 implements MigrationInterface {
  name = 'AddScenario1638132806055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`scenario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`context\` varchar(255) NOT NULL, \`isTemplate\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`scenario\``);
  }
}
