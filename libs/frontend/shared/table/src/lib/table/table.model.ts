import { TableTextComponent } from '../table-text/table-text.component';

export interface Pagination {
  offset: number;
  limit: number;
}
export interface ColumnTableConfiguration {
  title: string;
  size: number;
  dataProperty?: string;
  dataViewComponent?: typeof TableTextComponent;
}

export interface ActionTableConfiguration {
  label: string;
  action: (data: any) => void;
  shouldShow: boolean | Promise<boolean>;
  dataProperty?: string;
}

export interface TableConfiguration {
  columns: Array<ColumnTableConfiguration>;
  actions: Array<ActionTableConfiguration>;
}
