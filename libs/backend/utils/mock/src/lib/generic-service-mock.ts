import { Base } from '@stud-asso/backend-core-base';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

// TODO: change type of mockRepo
export const CreateMockRepo = (service: any, entity: typeof Base, mockRepo: any) =>
  Test.createTestingModule({
    providers: [service, { provide: getRepositoryToken(entity), useValue: mockRepo }],
  }).compile();
