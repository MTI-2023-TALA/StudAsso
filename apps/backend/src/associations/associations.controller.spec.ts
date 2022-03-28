import { TestingModule } from '@nestjs/testing';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { CreateMockService } from '../base/base-controller-spec';

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
    const obj = await controller.findAll();
    console.log(obj);
    expect(controller).toBeDefined();
  });
});
