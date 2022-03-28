import { TestingModule } from '@nestjs/testing';
import { CreateMockService } from '../base/base-controller-spec';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await CreateMockService(
      [UsersController],
      {
        type: UsersService,
        // TODO: set mock value
        methods: { findAll: jest.fn().mockResolvedValue([42]) },
      }
    );

    controller = moduleRef.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
