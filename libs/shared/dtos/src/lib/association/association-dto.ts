export class AssociationDto {
  id: number;
  name: string;
}

export class AssociationWithPresidentDto extends AssociationDto {
  presidentId: number;
}
