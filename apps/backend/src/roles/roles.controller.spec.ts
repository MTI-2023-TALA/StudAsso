import { CreateMockService } from '@stud-asso/backend/utils/mock';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TestingModule } from '@nestjs/testing';

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await CreateMockService([RolesController], {
      type: RolesService,
      // TODO: set mock value
      methods: { findAll: jest.fn().mockResolvedValue([42]) },
    });

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
