import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';


export class CreateAssociation1647719679181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'associations',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                ],
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('associations');
    }
}
