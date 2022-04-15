import { CreateMockRepo } from '@stud-asso/backend/utils/mock';
import { TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepo = {
    // TODO set mock value
    find: jest.fn().mockResolvedValue(42),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await CreateMockRepo(UsersService, User, mockRepo);

    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
});
