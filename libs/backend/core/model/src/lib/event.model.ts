import { QueryPaginationModel } from './query.model';

export class EventModel {
  id: number;
  name: string;
  date: Date;
  content: string;
  associationId: number;
}

export class CreateEventModel {
  name: string;
  date: Date;
  content: string;
  associationId: number;
}

export class UpdateEventModel {
  name?: string;
  date?: Date;
  content?: string;
  associationId?: number;
}

export class QueryEventModel extends QueryPaginationModel {
  isActive?: boolean;
}
