export interface ColumnTableConfiguration {
  title: string;
  size: number;
  dataProperty: string;
}

export interface ActionTableConfiguration {
  label: string;
  action: number;
}

export interface TableConfiguration {
  columns: Array<ColumnTableConfiguration>;
  actions: Array<ActionTableConfiguration>;
}
