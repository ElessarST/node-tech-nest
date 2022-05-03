import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReservations1651586869717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`create table reservations (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    number_of_guests int not null ,
    check_in_date date not null,
    check_out_date date not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    billing_address text not null,
    billing_country_id int not null,
    postal_code varchar(32) not null,
    city varchar(100) not null,
    email varchar(100) not null,
    phone_number varchar(100) not null,
    CONSTRAINT fk_country FOREIGN KEY(billing_country_id) REFERENCES countries(id)
);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`drop table reservations;`);
  }
}
