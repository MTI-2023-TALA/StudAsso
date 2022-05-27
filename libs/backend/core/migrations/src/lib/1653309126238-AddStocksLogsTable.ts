import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { dateDataColumnsWithId } from './base-migration/DefaultColumns';

export class AddStocksLogsTable1653309126238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stocks_logs',
        columns: [
          ...dateDataColumnsWithId,
          {
            name: 'stock_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'old_count',
            type: 'int',
          },
          {
            name: 'new_count',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            name: 'stock',
            referencedTableName: 'stocks',
            referencedColumnNames: ['id'],
            columnNames: ['stock_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stocks_logs', true, true, true);
  }
}
