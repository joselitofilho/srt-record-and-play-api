import {MigrationInterface, QueryRunner} from "typeorm";

export class setupDatabase1639593485311 implements MigrationInterface {
    name = 'setupDatabase1639593485311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`scenario_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`runStatus\` varchar(255) NOT NULL, \`autoHealingStatus\` varchar(255) NOT NULL, \`autoHealingResponse\` text NOT NULL, \`scenarioId\` int NULL, UNIQUE INDEX \`REL_46bd89d23a8d291bfbd3deba98\` (\`scenarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`scenario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`context\` varchar(255) NOT NULL, \`isTemplate\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`action_data\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NULL, \`by\` varchar(255) NULL, \`element\` varchar(255) NULL, \`element_type\` varchar(255) NULL, \`element_name\` varchar(255) NULL, \`text\` varchar(255) NULL, \`key\` varchar(255) NULL, \`type\` varchar(255) NOT NULL, INDEX \`IDX_293aa84ca3b96b2758e1e0f61d\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`action\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`scenarioId\` int NULL, \`dataId\` int NULL, UNIQUE INDEX \`REL_668f942e4380e458c62c5eec92\` (\`dataId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`scenario_status\` ADD CONSTRAINT \`FK_46bd89d23a8d291bfbd3deba98b\` FOREIGN KEY (\`scenarioId\`) REFERENCES \`scenario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`action\` ADD CONSTRAINT \`FK_af62aad8709959780767509aa75\` FOREIGN KEY (\`scenarioId\`) REFERENCES \`scenario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`action\` ADD CONSTRAINT \`FK_668f942e4380e458c62c5eec92f\` FOREIGN KEY (\`dataId\`) REFERENCES \`action_data\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_668f942e4380e458c62c5eec92f\``);
        await queryRunner.query(`ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_af62aad8709959780767509aa75\``);
        await queryRunner.query(`ALTER TABLE \`scenario_status\` DROP FOREIGN KEY \`FK_46bd89d23a8d291bfbd3deba98b\``);
        await queryRunner.query(`DROP INDEX \`REL_668f942e4380e458c62c5eec92\` ON \`action\``);
        await queryRunner.query(`DROP TABLE \`action\``);
        await queryRunner.query(`DROP INDEX \`IDX_293aa84ca3b96b2758e1e0f61d\` ON \`action_data\``);
        await queryRunner.query(`DROP TABLE \`action_data\``);
        await queryRunner.query(`DROP TABLE \`scenario\``);
        await queryRunner.query(`DROP INDEX \`REL_46bd89d23a8d291bfbd3deba98\` ON \`scenario_status\``);
        await queryRunner.query(`DROP TABLE \`scenario_status\``);
    }

}
