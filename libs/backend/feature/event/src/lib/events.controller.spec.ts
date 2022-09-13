import { AssociationDto, CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { ERROR } from '@stud-asso/backend/core/error';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  let mockedEvents: EventDto[];
  let mockedAssociations: AssociationDto[];

  beforeEach(async () => {
    mockedEvents = [
      { id: 1, name: 'Event 1', date: new Date('2022-2-15'), content: 'content', associationId: 1 },
      { id: 2, name: 'Event 2', date: new Date('2022-2-28'), content: 'content', associationId: 2 },
      { id: 3, name: 'Event 3', date: new Date('2022-3-13'), content: 'content', associationId: 1 },
    ];

    mockedAssociations = [
      {
        id: 1,
        name: 'Association 1',
        description: 'description',
      },
      {
        id: 2,
        name: 'Association 2',
        description: 'description',
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            create: jest.fn((createEventPayload: CreateEventDto): Promise<EventDto> => {
              if (!mockedAssociations.find((association) => association.id === createEventPayload.associationId)) {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
              const id = mockedEvents.length + 1;
              const newEvent: EventDto = {
                id,
                ...createEventPayload,
              };
              mockedEvents.push(newEvent);
              return Promise.resolve(newEvent);
            }),
            findAll: jest.fn((): Promise<EventDto[]> => {
              return Promise.resolve(mockedEvents);
            }),
            findAllByAssociationId: jest.fn((associationId: number): Promise<EventDto[]> => {
              if (!mockedAssociations.find((association) => association.id === associationId)) {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
              return Promise.resolve(mockedEvents.filter((event) => event.associationId === associationId));
            }),
            findOne: jest.fn((eventId: number): Promise<EventDto> => {
              const findEvent = mockedEvents.find((event) => event.id === eventId);
              if (!findEvent) throw new Error(ERROR.EVENT_NOT_FOUND);
              return Promise.resolve(findEvent);
            }),
            update: jest.fn((eventId: number, updateEventPayload: UpdateEventDto): Promise<EventDto> => {
              const updateEvent = mockedEvents.find((event) => event.id === eventId);
              if (!updateEvent) throw new Error(ERROR.EVENT_NOT_FOUND);
              const updatedEvent = {
                ...updateEvent,
                ...updateEventPayload,
              };
              return Promise.resolve(updatedEvent);
            }),
            delete: jest.fn((eventId: number): Promise<EventDto> => {
              const deleteEvent = mockedEvents.find((event) => event.id === eventId);
              if (!deleteEvent) throw new Error(ERROR.EVENT_NOT_FOUND);
              mockedEvents = mockedEvents.filter((event) => event.id !== eventId);
              return Promise.resolve(deleteEvent);
            }),
          },
        },
      ],
    }).compile();

    controller = await module.get<EventsController>(EventsController);
    service = await module.get<EventsService>(EventsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create Event', () => {
    it('should create a new event', async () => {
      const create = jest.spyOn(service, 'create');
      const associationId = 1;
      const createEventPayload: CreateEventDto = {
        name: 'New Event',
        date: new Date(new Date().toLocaleDateString()),
        content: 'new event content',
        associationId,
      };

      const newEvent: EventDto = {
        id: mockedEvents.length + 1,
        ...createEventPayload,
      };

      expect(await controller.create(createEventPayload)).toEqual(newEvent);
      expect(mockedEvents).toContainEqual(newEvent);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createEventPayload);
    });

    it('should fail creating a new event', async () => {
      const create = jest.spyOn(service, 'create');
      const associationId = -1;
      const createEventPayload: CreateEventDto = {
        name: 'New Event',
        date: new Date(new Date().toLocaleDateString()),
        content: 'new event content',
        associationId,
      };

      expect(controller.create(createEventPayload)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createEventPayload);
    });
  });

  describe('Find All Events', () => {
    it('should return all events', async () => {
      const findAll = jest.spyOn(service, 'findAll');

      expect(await controller.findAll()).toEqual(mockedEvents);
      expect(findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("Find All Association's events", () => {
    it('should return all events of an association', async () => {
      const findAllByAssociationId = jest.spyOn(service, 'findAllByAssociationId');
      const associationId = '1';

      expect(await controller.findAllByAssociationId(associationId)).toEqual(
        mockedEvents.filter((event) => event.associationId === +associationId)
      );
      expect(findAllByAssociationId).toHaveBeenCalledTimes(1);
      expect(findAllByAssociationId).toHaveBeenCalledWith(+associationId);
    });

    it('should fail to return events of non existing association', async () => {
      const findAllByAssociationId = jest.spyOn(service, 'findAllByAssociationId');
      const associationId = '-1';

      expect(controller.findAllByAssociationId(associationId)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
      expect(findAllByAssociationId).toHaveBeenCalledTimes(1);
      expect(findAllByAssociationId).toHaveBeenCalledWith(+associationId);
    });
  });

  describe('Find One Event', () => {
    it('should return one event', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      const eventId = '1';

      expect(await controller.findOne(eventId)).toEqual(mockedEvents.find((event) => event.id === +eventId));
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(+eventId);
    });

    it('should fail to return a non existing event', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      const eventId = '-1';

      expect(controller.findOne(eventId)).rejects.toThrow(ERROR.EVENT_NOT_FOUND);
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(+eventId);
    });
  });

  describe('Update Event', () => {
    it('should update an event', async () => {
      const update = jest.spyOn(service, 'update');
      const eventId = '2';
      const updateEventPayload: UpdateEventDto = {
        name: 'Updated Event',
        date: new Date(new Date().toLocaleDateString()),
        content: 'updated event content',
      };

      const updatedEvent: EventDto = {
        ...mockedEvents[1],
        ...updateEventPayload,
      };

      expect(await controller.update(eventId, updateEventPayload)).toEqual(updatedEvent);
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+eventId, updateEventPayload);
    });

    it('should fail to update an event', async () => {
      const update = jest.spyOn(service, 'update');
      const eventId = '-1';
      const updateEventPayload: UpdateEventDto = {
        name: 'Updated Event',
        date: new Date(new Date().toLocaleDateString()),
        content: 'updated event content',
      };

      expect(controller.update(eventId, updateEventPayload)).rejects.toThrow(ERROR.EVENT_NOT_FOUND);
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+eventId, updateEventPayload);
    });
  });

  describe('Delete Event', () => {
    it('should delete an event', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const newsId = '2';

      const deletedEvent = mockedEvents.find((event) => event.id === +newsId);
      const filteredMockedNews = mockedEvents.filter((event) => event.id !== +newsId);

      expect(await controller.delete(newsId)).toEqual(deletedEvent);
      expect(mockedEvents).toEqual(filteredMockedNews);
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+newsId);
    });

    it('should fail to delete an event', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const newsId = '-1';

      expect(controller.delete(newsId)).rejects.toThrow(ERROR.EVENT_NOT_FOUND);
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+newsId);
    });
  });
});
