import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Base } from '@stud-asso/backend/utils/base';
import { RoleDto } from '@stud-asso/shared/dtos';

@Entity('roles')
@Unique(['name', 'associationId'])
export class Role extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int', name: 'association_id' })
  associationId: number;

  constructor(dto?: RoleDto) {
    super();
    if (dto) Object.assign(this, dto);
  }
}
