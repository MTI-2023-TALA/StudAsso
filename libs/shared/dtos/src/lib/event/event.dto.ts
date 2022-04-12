import { Timestamp } from 'typeorm';

export class EventDto {
  id: number;
  name: string;
  date: Timestamp;
  content: string;
  associationId: number;
}
