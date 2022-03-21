import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAssociationsMembersTable1647813744740
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'associations_members',
        columns: [
          {
            name: 'association_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'members',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'associations',
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
    await queryRunner.dropTable('associations_members', true, true, true);
  }
}
