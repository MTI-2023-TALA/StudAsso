import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { dateDataColumnsWithId } from './base-migration/DefaultColumns';

export class CreateNewsFeedTable1649748053175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'news_feed',
        columns: [
          ...dateDataColumnsWithId,
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'association_id',
            type: 'int',
          },
          {
            name: 'content',
            type: 'text',
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
    await queryRunner.dropTable('news_feed', true, true, true);
  }
}
