import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAction1638132882766 implements MigrationInterface {
  name = 'AddAction1638132882766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`action_data\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NULL, \`by\` varchar(255) NULL, \`element\` varchar(255) NULL, \`element_type\` varchar(255) NULL, \`element_name\` varchar(255) NULL, \`text\` varchar(255) NULL, \`key\` varchar(255) NULL, \`type\` varchar(255) NOT NULL, INDEX \`IDX_293aa84ca3b96b2758e1e0f61d\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`action\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`dataId\` int NULL, UNIQUE INDEX \`REL_668f942e4380e458c62c5eec92\` (\`dataId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`action\` ADD CONSTRAINT \`FK_668f942e4380e458c62c5eec92f\` FOREIGN KEY (\`dataId\`) REFERENCES \`action_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_668f942e4380e458c62c5eec92f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_668f942e4380e458c62c5eec92\` ON \`action\``,
    );
    await queryRunner.query(`DROP TABLE \`action\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_293aa84ca3b96b2758e1e0f61d\` ON \`action_data\``,
    );
    await queryRunner.query(`DROP TABLE \`action_data\``);
  }
}
