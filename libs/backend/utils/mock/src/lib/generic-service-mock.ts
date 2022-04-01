import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Base } from '../../src/base/entities/base.entity';

// TODO: change type of mockRepo
export const CreateMockRepo = (
  service: any,
  entity: typeof Base,
  mockRepo: any
) =>
  Test.createTestingModule({
    providers: [
      service,
      { provide: getRepositoryToken(entity), useValue: mockRepo },
    ],
  }).compile();
