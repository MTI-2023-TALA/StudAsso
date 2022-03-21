import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsMembersController } from './associations-members.controller';
import { AssociationsMembersService } from './associations-members.service';

describe('AssociationsMembersController', () => {
  let controller: AssociationsMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationsMembersController],
      providers: [AssociationsMembersService],
    }).compile();

    controller = module.get<AssociationsMembersController>(AssociationsMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
