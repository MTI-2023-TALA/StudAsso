import { TestingModule } from '@nestjs/testing';
import { CreateMockService } from '../../helpers/generic-spec/generic-controller-spec';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await CreateMockService(
      [RolesController],
      {
        type: RolesService,
        // TODO: set mock value
        methods: {findAll: jest.fn().mockResolvedValue([42]) },
      });

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
