export class AssociationDto {
  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  id: number;
  name: string;
  description: string;
}

export class AssociationWithPresidentDto extends AssociationDto {
  constructor(id: number, name: string, description: string, presidentId: number) {
    super(id, name, description);
    this.presidentId = presidentId;
  }

  presidentId: number;
}
