import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddScenarioStatus1638133063935 implements MigrationInterface {
  name = 'AddScenarioStatus1638133063935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`scenario_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`scenarioId\` int NULL, UNIQUE INDEX \`REL_46bd89d23a8d291bfbd3deba98\` (\`scenarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scenario_status\` ADD CONSTRAINT \`FK_46bd89d23a8d291bfbd3deba98b\` FOREIGN KEY (\`scenarioId\`) REFERENCES \`scenario\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scenario_status\` DROP FOREIGN KEY \`FK_46bd89d23a8d291bfbd3deba98b\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_46bd89d23a8d291bfbd3deba98\` ON \`scenario_status\``,
    );
    await queryRunner.query(`DROP TABLE \`scenario_status\``);
  }
}
