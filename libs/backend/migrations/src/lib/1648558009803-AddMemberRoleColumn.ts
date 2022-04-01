import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddMemberRoleColumn1648558009803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'associations_members',
      new TableColumn({
        name: 'role_id',
        type: 'int',
      })
    );

    await queryRunner.createForeignKey(
      'associations_members',
      new TableForeignKey({
        name: 'role',
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
        columnNames: ['role_id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('associations_members', 'role');
    await queryRunner.dropColumn('associations_members', 'role_id');
  }
}
