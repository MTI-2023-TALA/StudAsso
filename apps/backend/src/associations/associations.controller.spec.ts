import { TestingModule } from '@nestjs/testing';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { CreateMockService } from '../../helpers/generic-spec/generic-controller-spec';

describe('AssociationsController', () => {
  let controller: AssociationsController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await CreateMockService(
      [AssociationsController],
      {
        type: AssociationsService,
        // TODO: set mock value
        methods: { findAll: jest.fn().mockResolvedValue([42]) },
      }
    );

    controller = moduleRef.get<AssociationsController>(AssociationsController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
