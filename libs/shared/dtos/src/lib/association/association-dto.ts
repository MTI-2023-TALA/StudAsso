export class AssociationDto {
  id: number;
  name: string;
  description: string;
}

export class AssociationWithPresidentDto extends AssociationDto {
  presidentId: number;
}
