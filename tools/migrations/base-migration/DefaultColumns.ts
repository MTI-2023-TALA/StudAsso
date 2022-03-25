import { TableColumnOptions } from 'typeorm';

export const dateDataColumns: TableColumnOptions[] = [
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'deleted_at',
    type: 'timestamp',
    isNullable: true,
  },
];

export const dateDataColumnsWithId: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
  },
  ...dateDataColumns,
];
