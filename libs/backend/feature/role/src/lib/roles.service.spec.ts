import { CreateMockRepo } from '@stud-asso/backend/utils/mock';
import { Role } from '@stud-asso/backend/core/orm';
import { RolesService } from './roles.service';
import { TestingModule } from '@nestjs/testing';

describe('RolesService', () => {
  let service: RolesService;

  const mockRepo = {
    // TODO set mock value
    find: jest.fn().mockResolvedValue(42),
  };

  beforeEach(async () => {
    const module: TestingModule = await CreateMockRepo(RolesService, Role, mockRepo);

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
