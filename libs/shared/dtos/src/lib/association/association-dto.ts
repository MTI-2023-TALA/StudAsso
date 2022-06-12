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
  constructor(
    id: number,
    name: string,
    description: string,
    presidentId: number,
    firstname: string,
    lastname: string,
    email: string,
    isSchoolEmployee: boolean
  ) {
    super(id, name, description);
    this.presidentId = presidentId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.isSchoolEmployee = isSchoolEmployee;
  }

  presidentId: number;
  firstname: string;
  lastname: string;
  email: string;
  isSchoolEmployee: boolean;
}
