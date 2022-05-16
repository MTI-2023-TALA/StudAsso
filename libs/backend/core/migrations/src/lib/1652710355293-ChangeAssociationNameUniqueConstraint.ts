import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class ChangeAssociationNameUniqueConstraint1652710355293 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('associations', 'unique_association_name');
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_association_name" ON associations(name, (deleted_at IS NULL)) WHERE deleted_at IS NULL;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('associations', 'unique_association_name');
    await queryRunner.createUniqueConstraint(
      'associations',
      new TableUnique({ name: 'unique_association_name', columnNames: ['name'] })
    );
  }
}
