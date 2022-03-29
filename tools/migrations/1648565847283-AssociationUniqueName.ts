import {MigrationInterface, QueryRunner, Table, TableUnique} from "typeorm";

export class AssociationUniqueName1648565847283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createUniqueConstraint('associations',
      new TableUnique({
        name: 'unique_association_name',
        columnNames: ['name'],
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropUniqueConstraint('associations', 'unique_association_name');
    }
}
