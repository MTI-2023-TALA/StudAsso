import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addActionColumnToStockLogs1654855327894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'stocks_logs',
      new TableColumn({
        name: 'action',
        type: 'varchar',
        default: "'update'",
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('stocks_logs', 'action');
  }
}
