import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  dateDataColumns,
  dateDataColumnsWithId,
} from './base-migration/DefaultColumns';

export class CreateUsersTable1647711248627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          ...dateDataColumnsWithId,
          {
            name: 'firstname',
            type: 'varchar',
          },
          {
            name: 'lastname',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
