import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { dateDataColumnsWithId } from './base-migration/DefaultColumns';

export class AddEventTable1649769461393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          ...dateDataColumnsWithId,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'association_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            name: 'association',
            referencedTableName: 'associations',
            referencedColumnNames: ['id'],
            columnNames: ['association_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('events', true, true, true);
  }
}
