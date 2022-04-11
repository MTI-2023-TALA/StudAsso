import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { dateDataColumnsWithId } from './base-migration/DefaultColumns';

export class CreateStocksTable1649680937686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stocks',
        columns: [
          ...dateDataColumnsWithId,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'count',
            type: 'int',
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
        uniques: [
          {
            name: 'unique_stock_name_per_association',
            columnNames: ['name', 'association_id'],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stocks', true, true, true);
  }
}
