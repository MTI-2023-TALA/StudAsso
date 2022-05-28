import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDescriptionToAssociationTable1653741848255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'associations',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('associations', 'description');
  }
}
