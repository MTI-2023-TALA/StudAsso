import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

interface IService {
  type: any;
  methods: object;
}

const moduleMocker = new ModuleMocker(global);

export const CreateMockService = (controllers: any[], service: IService) =>
  Test.createTestingModule({ controllers: [...controllers] })
    .useMocker((token) => {
      if (token === service.type) {
        return service.methods;
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
