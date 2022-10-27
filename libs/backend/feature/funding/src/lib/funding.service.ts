import { AssociationRepository, FundingRepository } from '@stud-asso/backend/core/repository';
import {
  CreateFundingDto,
  FUNDING_STATUS,
  FundingDto,
  OptionStatFundingDto,
  QueryFundingStatusDto,
  QueryPaginationDto,
  StatFundingDto,
  SumFundingStatusDto,
  UpdateFundingDto,
} from '@stud-asso/shared/dtos';
import { CreateFundingModel, FundingModel, UpdateFundingModel } from '@stud-asso/backend/core/model';

import { ERROR } from '@stud-asso/backend/core/error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FundingService {
  constructor(
    private readonly fundingRepository: FundingRepository,
    private readonly associationRepository: AssociationRepository
  ) {}

  public async create(assoId: number, userId: number, createFundingDto: CreateFundingDto): Promise<FundingDto> {
    const funding = await this.fundingRepository.create(assoId, userId, createFundingDto as CreateFundingModel);
    return this.mapFundingModelToDto(funding);
  }

  public async findAll(assoId: number, query: QueryPaginationDto): Promise<FundingDto[]> {
    const fundings = await this.fundingRepository.findAll(assoId, query);
    return fundings.map((funding) => this.mapFundingModelToDto(funding));
  }

  public async getSumOfOfferSpecificStatus(query: QueryFundingStatusDto): Promise<SumFundingStatusDto> {
    const sum = await this.fundingRepository.getNbStatus(query);
    return { sum };
  }

  public async findOne(id: number): Promise<FundingDto> {
    const funding = await this.fundingRepository.findOne(id);
    if (!funding) throw new Error(ERROR.FUNDING_NOT_FOUND);
    return this.mapFundingModelToDto(funding);
  }

  public async update(id: number, updateFundingDto: UpdateFundingDto): Promise<FundingDto> {
    const funding = await this.fundingRepository.update(id, updateFundingDto as UpdateFundingModel);
    return this.mapFundingModelToDto(funding);
  }

  public async getStats(assoId: number, optionStatFundingDto: OptionStatFundingDto): Promise<StatFundingDto> {
    const stats: StatFundingDto = {} as unknown;

    const startDate = optionStatFundingDto.startDate
      ? new Date(optionStatFundingDto.startDate)
      : await this.associationRepository.getCreationDate(assoId);
    const endDate = optionStatFundingDto.endDate ? new Date(optionStatFundingDto.endDate) : new Date();

    if (optionStatFundingDto.startDate || optionStatFundingDto.endDate) {
      stats.sum = await this.getSumInInterval(assoId, { startDate, endDate });
    }

    if (optionStatFundingDto.nbAccepted) {
      stats.nbAccepted = await this.fundingRepository.getNbAssoStatus(assoId, FUNDING_STATUS.APPROVED);
    }

    if (optionStatFundingDto.nbRejected) {
      stats.nbRefused = await this.fundingRepository.getNbAssoStatus(assoId, FUNDING_STATUS.REJECTED);
    }

    return stats;
  }

  private async getSumInInterval(
    assoId: number,
    { startDate, endDate }: { startDate: Date; endDate: Date }
  ): Promise<number> {
    const sum = await this.fundingRepository.getSumInInterval(assoId, { startDate, endDate });
    return sum._sum.amount;
  }

  private mapFundingModelToDto(funding: FundingModel): FundingDto {
    return {
      ...funding,
      status: funding.status as FUNDING_STATUS,
      association: funding.association.name,
    };
  }
}
