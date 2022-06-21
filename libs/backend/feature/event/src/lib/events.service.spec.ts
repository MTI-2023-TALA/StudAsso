import { CreateEventDto, UpdateEventDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { EventRepository } from '@stud-asso/backend/core/repository';
import { EventsService } from './events.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

const mockedEvents = [
  {
    id: 1,
    name: 'Event1',
    date: new Date('2022-01-15'),
    content: 'An amazing description',
    associationId: 1,
  },
  {
    id: 2,
    name: 'Event2',
    date: new Date('2022-02-15'),
    content: 'An amazing description again',
    associationId: 2,
  },
];

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('EventsService', () => {
  let service: EventsService;
  let repository: EventRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EventRepository,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockedEvents[0])),
            findAll: jest.fn(() => Promise.resolve(mockedEvents)),
            findOne: jest.fn(() => Promise.resolve(mockedEvents[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    repository = module.get<EventRepository>(EventRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createEvent', () => {
    it('should call eventRepository.create with correct params', async () => {
      const createEventParams = {
        name: 'Event1',
        date: new Date('2022-01-15'),
        content: 'An amazing description',
        associationId: 1,
      };
      const createEventDto = plainToInstance(CreateEventDto, createEventParams);
      const create = jest.spyOn(repository, 'create');

      const createResultRetrieved = await service.create(createEventDto);
      expect(createResultRetrieved).toEqual(mockedEvents[0]);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createEventParams);
    });
  });

  describe('findAllEvents', () => {
    it('should call eventRepository.findAll', async () => {
      const findAll = jest.spyOn(repository, 'findAll');

      const eventsRetrieved = await service.findAll();
      expect(eventsRetrieved).toEqual(mockedEvents);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOneEvent', () => {
    it('should call eventRepository.findOne', async () => {
      const findOne = jest.spyOn(repository, 'findOne');

      const eventRetrieved = await service.findOne(1);
      expect(eventRetrieved).toEqual(mockedEvents[0]);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateEvent', () => {
    it('shoud call eventRepository.update', async () => {
      const updateEventDto = plainToInstance(UpdateEventDto, { content: 'Event1 Renamed' });
      const update = jest.spyOn(repository, 'update');

      const updateResultRetrieved = await service.update(1, updateEventDto);
      expect(updateResultRetrieved).toEqual(mockedUpdateResult);

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, { content: 'Event1 Renamed' });
    });
  });

  describe('deleteEvent', () => {
    it('shoud call eventRepository.remove', async () => {
      const deleteCall = jest.spyOn(repository, 'delete');

      const deleteResultRetrieved = await service.delete(1);
      expect(deleteResultRetrieved).toEqual(mockedUpdateResult);

      expect(deleteCall).toHaveBeenCalledTimes(1);
      expect(deleteCall).toHaveBeenCalledWith(1);
    });
  });
});
