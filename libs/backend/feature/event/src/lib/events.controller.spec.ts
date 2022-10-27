import { AssociationDto, CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { ERROR } from '@stud-asso/backend/core/error';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;

  let mockedEvents: EventDto[];
  let mockedAssociations: AssociationDto[];

  beforeEach(async () => {
    mockedEvents = [
      {
        id: 1,
        name: 'Event 1',
        date: new Date('15-02-2022'),
        content: 'content',
        associationId: 1,
        association: { id: 1, name: 'Association 1' },
      },
      {
        id: 2,
        name: 'Event 2',
        date: new Date('28-02-2022'),
        content: 'content',
        associationId: 2,
        association: { id: 2, name: 'Association 2' },
      },
      {
        id: 3,
        name: 'Event 3',
        date: new Date('13-03-2022'),
        content: 'content',
        associationId: 1,
        association: { id: 1, name: 'Association 1' },
      },
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
            create: jest.fn((associationId: number, createEventPayload: CreateEventDto) => {
              if (!mockedAssociations.find((association) => association.id === associationId)) {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
              const id = mockedEvents.length + 1;
              const newEvent: EventDto = {
                id,
                ...createEventPayload,
                associationId,
                association: { id: associationId, name: 'Association 1' },
              };
              mockedEvents.push(newEvent);
              return Promise.resolve(newEvent);
            }),
            findAll: jest.fn(() => {
              return Promise.resolve(mockedEvents);
            }),
            findAllByAssociationId: jest.fn((associationId: number) => {
              if (!mockedAssociations.find((association) => association.id === associationId)) {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
              return Promise.resolve(mockedEvents.filter((event) => event.associationId === associationId));
            }),
            findOne: jest.fn((eventId: number) => {
              const findEvent = mockedEvents.find((event) => event.id === eventId);
              if (!findEvent) throw new Error(ERROR.EVENT_NOT_FOUND);
              return Promise.resolve(findEvent);
            }),
            update: jest.fn((eventId: number, updateEventPayload: UpdateEventDto) => {
              const updateEvent = mockedEvents.find((event) => event.id === eventId);
              if (!updateEvent) throw new Error(ERROR.EVENT_NOT_FOUND);
              const updatedEvent = {
                ...updateEvent,
                ...updateEventPayload,
              };
              return Promise.resolve(updatedEvent);
            }),
            delete: jest.fn((eventId: number) => {
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
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create Event', () => {
    it('should create a new event', async () => {
      const associationId = 1;
      const createEventPayload: CreateEventDto = {
        name: 'New Event',
        date: new Date(new Date().toLocaleDateString()),
        content: 'new event content',
      };

      const newEvent: EventDto = {
        id: mockedEvents.length + 1,
        ...createEventPayload,
        associationId,
        association: { id: associationId, name: 'Association 1' },
      };

      expect(await controller.create(associationId, createEventPayload)).toEqual(newEvent);
      expect(mockedEvents).toContainEqual(newEvent);
    });

    it('should fail creating a new event', async () => {
      const associationId = -1;
      const createEventPayload: CreateEventDto = {
        name: 'New Event',
        date: new Date(new Date().toLocaleDateString()),
        content: 'new event content',
      };

      expect(controller.create(associationId, createEventPayload)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });

  describe('Find All Events', () => {
    it('should return all events', async () => {
      expect(await controller.findAll({})).toEqual(mockedEvents);
    });
  });

  describe("Find All Association's events", () => {
    it('should return all events of an association', async () => {
      const associationId = '1';
      expect(await controller.findAllByAssociationId(associationId, {})).toEqual(
        mockedEvents.filter((event) => event.associationId === +associationId)
      );
    });

    it('should fail to return events of non existing association', async () => {
      const associationId = '-1';
      expect(controller.findAllByAssociationId(associationId, {})).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });

  describe('Find One Event', () => {
    it('should return one event', async () => {
      const eventId = '1';
      expect(await controller.findOne(eventId)).toEqual(mockedEvents.find((event) => event.id === +eventId));
    });

    it('should fail to return a non existing event', async () => {
      const eventId = '-1';
      expect(controller.findOne(eventId)).rejects.toThrow(ERROR.EVENT_NOT_FOUND);
    });
  });

  describe('Update Event', () => {
    it('should update an event', async () => {
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
    });

    it('should fail to update an event', async () => {
      const eventId = '-1';
      const updateEventPayload: UpdateEventDto = {
        name: 'Updated Event',
        date: new Date(new Date().toLocaleDateString()),
        content: 'updated event content',
      };

      expect(controller.update(eventId, updateEventPayload)).rejects.toThrow(ERROR.EVENT_NOT_FOUND);
    });
  });

  describe('Delete Event', () => {
    it('should delete an event', async () => {
      const newsId = '2';

      const deletedEvent = mockedEvents.find((event) => event.id === +newsId);
      const filteredMockedNews = mockedEvents.filter((event) => event.id !== +newsId);

      expect(await controller.delete(newsId)).toEqual(deletedEvent);
      expect(mockedEvents).toEqual(filteredMockedNews);
    });

    it('should fail to delete an event', async () => {
      const newsId = '-1';
      expect(controller.delete(newsId)).rejects.toThrow(ERROR.EVENT_NOT_FOUND);
    });
  });
});
