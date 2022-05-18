import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class AddUniqueConstraintOnUserEmail1652726114128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({ name: 'user_email_unique', columnNames: ['email'] })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('users', 'user_email_unique');
  }
}
