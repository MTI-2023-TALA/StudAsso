import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { dateDataColumnsWithId } from './base-migration/DefaultColumns';

export class CreateAssociationsTable1647813383509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'associations',
        columns: [
          ...dateDataColumnsWithId,
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('associations');
  }
}
