import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserHashAndRt1652515210453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'password_hash',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'rt_hash',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'password_hash');
    await queryRunner.dropColumn('users', 'rt_hash');
  }
}
