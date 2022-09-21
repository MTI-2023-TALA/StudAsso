import { AssociationDto, CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';
import { AssociationRepository, EventRepository } from '@stud-asso/backend/core/repository';
import { CreateEventModel, UpdateEventModel } from '@stud-asso/backend/core/model';
import { Test, TestingModule } from '@nestjs/testing';

import { ERROR } from '@stud-asso/backend/core/error';
import { EventsService } from './events.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

describe('EventsService', () => {
  let service: EventsService;
  let repository: EventRepository;

  let mockedEvents: EventDto[];
  let mockedAssociations: AssociationDto[];

  beforeEach(async () => {
    mockedEvents = [
      { id: 1, name: 'Event 1', date: new Date('15-02-2022'), content: 'content', associationId: 1 },
      { id: 2, name: 'Event 2', date: new Date('28-02-2022'), content: 'content', associationId: 2 },
      { id: 3, name: 'Event 3', date: new Date('13-03-2022'), content: 'content', associationId: 1 },
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
      providers: [
        EventsService,
        {
          provide: EventRepository,
          useValue: {
            create: jest.fn((createEventPayload: CreateEventModel) => {
              if (!mockedAssociations.find((association) => association.id === createEventPayload.associationId)) {
                throw new PrismaClientKnownRequestError('mock', 'P2003', 'mock', { field_name: 'association (index)' });
              }
              const id = mockedEvents.length + 1;
              const newEvent: EventDto = {
                id,
                ...createEventPayload,
              };
              mockedEvents.push(newEvent);
              return Promise.resolve(newEvent);
            }),
            findAll: jest.fn(() => {
              return Promise.resolve(mockedEvents);
            }),
            findAllByAssociationId: jest.fn((associationId: number) => {
              return Promise.resolve(mockedEvents.filter((event) => event.associationId === associationId));
            }),
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedEvents.find((event) => event.id === id));
            }),
            update: jest.fn((id: number, updateEventPayload: UpdateEventModel) => {
              let updateEvent = mockedEvents.find((event) => event.id === id);
              updateEvent = {
                ...updateEvent,
                ...updateEventPayload,
              };
              return Promise.resolve(updateEvent);
            }),
            delete: jest.fn((id: number) => {
              const deleteEvent = mockedEvents.find((event) => event.id === id);
              if (!deleteEvent) {
                throw new PrismaClientKnownRequestError(
                  'Invalid `prisma.event.delete()` invocation:',
                  'P2025',
                  'mock',
                  {
                    cause: 'Record to delete does not exist.',
                  }
                );
              }
              mockedEvents = mockedEvents.filter((event) => event.id !== id);
              return Promise.resolve(deleteEvent);
            }),
          },
        },
        {
          provide: AssociationRepository,
          useValue: {
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedAssociations.find((association) => association.id === id));
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    repository = module.get<EventRepository>(EventRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create Event', () => {
    it('should create a new event', async () => {
      const associationId = 1;
      const createEventPayload: CreateEventDto = {
        name: 'New Event',
        date: new Date('15-02-2022'),
        content: 'content',
      };

      const newEvent: EventDto = {
        id: mockedEvents.length + 1,
        ...createEventPayload,
        associationId,
      };

      expect(await service.create(associationId, createEventPayload)).toEqual(newEvent);
    });

    it('should fail to create a new event because the association does not exist', async () => {
      const associationId = -1;
      const createEventPayload: CreateEventDto = {
        name: 'New Event',
        date: new Date('15-02-2022'),
        content: 'content',
      };

      expect(service.create(associationId, createEventPayload)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });

    describe('Find All Events', () => {
      it('should return all events', async () => {
        expect(await service.findAll()).toEqual(mockedEvents);
      });
    });

    describe("Find All Association's events", () => {
      it('should return all association events', async () => {
        const findAllByAssociationId = jest.spyOn(repository, 'findAllByAssociationId');
        const associationId = 1;

        expect(await service.findAllByAssociationId(associationId)).toEqual(
          mockedEvents.filter((event) => event.associationId === associationId)
        );
        expect(findAllByAssociationId).toHaveBeenCalledTimes(1);
        expect(findAllByAssociationId).toHaveBeenCalledWith(associationId);
      });

      it("should fail to return all association's events because association does not exist", async () => {
        const findAllByAssociationId = jest.spyOn(repository, 'findAllByAssociationId');
        const associationId = -1;

        expect(service.findAllByAssociationId(associationId)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
        expect(findAllByAssociationId).toHaveBeenCalledTimes(0);
      });
    });

    describe('Find One Event', () => {
      it('should return one event', async () => {
        const findOne = jest.spyOn(repository, 'findOne');
        const id = 1;

        expect(await service.findOne(id)).toEqual(mockedEvents.find((event) => event.id === id));
        expect(findOne).toHaveBeenCalledTimes(1);
        expect(findOne).toHaveBeenCalledWith(id);
      });

      it('should fail to return one event because event does not exist', async () => {
        const findOne = jest.spyOn(repository, 'findOne');
        const id = -1;

        expect(service.findOne(id)).rejects.toThrow(ERROR.EVENT_NOT_FOUND);
        expect(findOne).toHaveBeenCalledTimes(1);
        expect(findOne).toHaveBeenCalledWith(id);
      });
    });

    describe('Update Event', () => {
      it('should update one event', async () => {
        const update = jest.spyOn(repository, 'update');
        const id = 1;
        const updateEventPayload: UpdateEventDto = {
          name: 'updated event name',
          date: new Date('22-02-2022'),
          content: 'new content',
        };

        const updateEvent: EventDto = {
          ...mockedEvents[id - 1],
          ...updateEventPayload,
        };

        expect(await service.update(id, updateEventPayload)).toEqual(updateEvent);
        expect(update).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledWith(id, updateEventPayload);
      });

      it('should fail to update event because event does not exist', async () => {
        const update = jest.spyOn(repository, 'update');
        const id = -1;
        const updateEventPayload: UpdateEventDto = {
          name: 'updated event name',
          date: new Date('22-02-2022'),
          content: 'new content',
        };

        expect(service.update(id, updateEventPayload)).rejects.toThrow(ERROR.EVENT_NOT_FOUND);
        expect(update).toHaveBeenCalledTimes(0);
      });
    });

    describe('Delete Event', () => {
      it('should delete an event', async () => {
        const deleteCall = jest.spyOn(repository, 'delete');
        const eventId = 1;

        const deletedEvent = mockedEvents.find((event) => event.id === eventId);
        const filteredMockedEvents = mockedEvents.filter((event) => event.id !== eventId);

        expect(await service.delete(eventId)).toEqual(deletedEvent);
        expect(mockedEvents).toEqual(filteredMockedEvents);
        expect(deleteCall).toHaveBeenCalledTimes(1);
        expect(deleteCall).toHaveBeenCalledWith(eventId);
      });

      it('should fail to delete an event that does not exist', async () => {
        const deleteCall = jest.spyOn(repository, 'delete');
        const eventId = -1;

        expect(service.delete(eventId)).rejects.toThrow(ERROR.EVENT_NOT_FOUND);
        expect(deleteCall).toHaveBeenCalledTimes(1);
        expect(deleteCall).toHaveBeenCalledWith(eventId);
      });
    });
  });
});
