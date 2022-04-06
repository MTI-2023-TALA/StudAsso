import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Base } from '@stud-asso/backend/utils/base';
import { BaseDto } from '@stud-asso/shared/dtos';

// TODO: change type of mockRepo
export const CreateMockRepo = (service: any, entity: typeof BaseDto, mockRepo: any) =>
  Test.createTestingModule({
    providers: [service, { provide: getRepositoryToken(entity), useValue: mockRepo }],
  }).compile();
