import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('AssociationsController', () => {
  let controller: AssociationsController;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [AssociationsController],
    //   providers: [AssociationsService],
    // }).compile();
    // controller = module.get<AssociationsController>(AssociationsController);

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AssociationsController],
    })
      .useMocker((token) => {
        if (token === AssociationsService) {
          // TODO set mock value
          return { findAll: jest.fn().mockResolvedValue(42) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get<AssociationsController>(AssociationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
