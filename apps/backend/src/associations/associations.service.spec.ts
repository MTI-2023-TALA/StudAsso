import { Association } from './entities/association.entity';
import { AssociationsService } from './associations.service';
import { CreateMockRepo } from '@stud-asso/backend/utils/mock';
import { TestingModule } from '@nestjs/testing';

describe('AssociationsService', () => {
  let service: AssociationsService;

  const mockRepo = {
    // TODO set mock value
    findOne: jest.fn().mockResolvedValue(42),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await CreateMockRepo(AssociationsService, Association, mockRepo);

    service = moduleRef.get<AssociationsService>(AssociationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
