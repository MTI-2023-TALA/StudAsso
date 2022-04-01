import { TestingModule } from '@nestjs/testing';
import { CreateMockService } from '@stud-asso/backend/utils/mock';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';

describe('AssociationsController', () => {
  let controller: AssociationsController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await CreateMockService([AssociationsController], {
      type: AssociationsService,
      // TODO: set mock value
      methods: { findAll: jest.fn().mockResolvedValue([42]) },
    });

    controller = moduleRef.get<AssociationsController>(AssociationsController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
