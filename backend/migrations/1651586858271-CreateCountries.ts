import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCountries1651586858271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`create table countries (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name varchar(100) not null
);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`drop table countries;`);
  }
}
