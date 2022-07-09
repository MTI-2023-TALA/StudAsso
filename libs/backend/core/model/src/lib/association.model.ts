import { UserIdAndUserModel } from './associations-member.model';

export class AssociationModel {
  id: number;
  name: string;
  descrition?: string;
}

export class CreateAssociationModel {
  name: string;
  description?: string;
}

export class AssociationWithPresidentModel {
  id: number;
  name: string;
  description?: string;
  associationsMembers: UserIdAndUserModel[];
}

export class AssociationPresidentModel {
  associationsMembers: UserIdAndUserModel[];
}

export class AssociationNameModel {
  name: string;
}
