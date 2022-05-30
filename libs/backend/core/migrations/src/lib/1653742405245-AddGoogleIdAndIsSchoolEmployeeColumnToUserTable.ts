import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddGoogleIdAndIsSchoolEmployeeColumnToUserTable1653742405245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'google_id',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'is_school_employee',
        type: 'boolean',
        default: false,
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'google_id');
    await queryRunner.dropColumn('users', 'is_school_employee');
  }
}
