import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddActionScenarioRelation1638132978964
  implements MigrationInterface
{
  name = 'AddActionScenarioRelation1638132978964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`action\` ADD \`scenarioId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`action\` ADD CONSTRAINT \`FK_af62aad8709959780767509aa75\` FOREIGN KEY (\`scenarioId\`) REFERENCES \`scenario\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_af62aad8709959780767509aa75\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`action\` DROP COLUMN \`scenarioId\``,
    );
  }
}
