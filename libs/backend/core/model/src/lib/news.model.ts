import { AssociationNameModel } from './association.model';

export class NewsModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  associationId: number;
  title: string;
  content: string;
}

export class NewsWithAssoNameModel extends NewsModel {
  association: AssociationNameModel;
}
