import { EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

const mockCreateEventDto: EventDto = {
  id: 1,
  name: 'Event1',
  date: new Date('2022-01-15'),
  content: 'An amazing description',
  associationId: 1,
};
const mockfindAllEvents: EventDto[] = [
  { id: 1, name: 'Event1', date: new Date('2022-01-15'), content: 'An amazing description', associationId: 1 },
  { id: 2, name: 'Event2', date: new Date('2022-02-15'), content: 'An amazing description again', associationId: 2 },
];
const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockCreateEventDto)),
            findAll: jest.fn(() => Promise.resolve(mockfindAllEvents)),
            findOne: jest.fn(() => Promise.resolve(mockfindAllEvents[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
      ],
    }).compile();

    controller = await module.get<EventsController>(EventsController);
    service = await module.get<EventsService>(EventsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createEvent', () => {
    it('should call eventsService.create', async () => {
      const create = jest.spyOn(service, 'create');

      const createdEvent = await controller.create({
        name: 'Event1',
        date: new Date('2022-01-15'),
        content: 'An amazing description',
        associationId: 1,
      });
      expect(createdEvent).toEqual(mockCreateEventDto);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith({
        name: 'Event1',
        date: new Date('2022-01-15'),
        content: 'An amazing description',
        associationId: 1,
      });
    });
  });

  describe('findAllEvents', () => {
    it('should call eventsService.findAll', async () => {
      expect(await controller.findAll()).toEqual(mockfindAllEvents);
    });
  });

  describe('findOneEvent', () => {
    it('shoud call eventsService.findOne', async () => {
      expect(await controller.findOne('1')).toEqual(mockfindAllEvents[0]);
    });
  });

  describe('updateEvent', () => {
    it('should call eventsService.update', async () => {
      const updateEventDto = plainToInstance(UpdateEventDto, { content: 'Association 1 Renamed' });
      expect(await controller.update('1', updateEventDto)).toEqual(mockedUpdateResult);
    });
  });

  describe('deleteEvent', () => {
    it('should call eventsService.delete', async () => {
      expect(await controller.delete('1')).toEqual(mockedUpdateResult);
    });
  });
});
