import { MigrationInterface, QueryRunner } from 'typeorm';

export class CountriesSeed1651586876476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(
      `insert into countries (name) values ('Germany'), ('Netherlands'), ('USA');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`truncate countries;`);
  }
}
