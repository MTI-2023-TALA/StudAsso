import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssociationsService } from './associations.service';
import { Association } from './entities/association.entity';

describe('AssociationsService', () => {
  let service: AssociationsService;

  const mockedRepo = {
    // TODO set mock value
    findOne: jest.fn().mockResolvedValue(42),
  };

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [AssociationsService],
    // }).compile();

    // service = module.get<AssociationsService>(AssociationsService);
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        { provide: getRepositoryToken(Association), useValue: mockedRepo },
      ],
    }).compile();

    service = moduleRef.get<AssociationsService>(AssociationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
