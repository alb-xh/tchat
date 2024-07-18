const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitDb1721317033855 {
    name = 'InitDb1721317033855'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "type" smallint NOT NULL, "name" text, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_users_user" ("chatId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c6af481280fb886733ddbd73661" PRIMARY KEY ("chatId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a573fa22dfa3574496311588c" ON "chat_users_user" ("chatId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2004be39e2b3044c392bfe3e61" ON "chat_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "chat_users_user" ADD CONSTRAINT "FK_6a573fa22dfa3574496311588c7" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "chat_users_user" ADD CONSTRAINT "FK_2004be39e2b3044c392bfe3e617" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_users_user" DROP CONSTRAINT "FK_2004be39e2b3044c392bfe3e617"`);
        await queryRunner.query(`ALTER TABLE "chat_users_user" DROP CONSTRAINT "FK_6a573fa22dfa3574496311588c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2004be39e2b3044c392bfe3e61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a573fa22dfa3574496311588c"`);
        await queryRunner.query(`DROP TABLE "chat_users_user"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
