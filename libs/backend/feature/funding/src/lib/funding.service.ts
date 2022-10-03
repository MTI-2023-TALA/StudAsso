import { AssociationRepository, FundingRepository } from '@stud-asso/backend/core/repository';
import {
  CreateFundingDto,
  FundingDto,
  OptionStatFundingDto,
  StatFundingDto,
  UpdateFundingDto,
} from '@stud-asso/shared/dtos';
import { CreateFundingModel, UpdateFundingModel } from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FundingService {
  constructor(
    private readonly fundingRepository: FundingRepository,
    private readonly associationRepository: AssociationRepository
  ) {}

  public async create(assoId: number, userId: number, createFundingDto: CreateFundingDto): Promise<FundingDto> {
    return (await this.fundingRepository.create(assoId, userId, createFundingDto as CreateFundingModel)) as FundingDto;
  }

  public async findAll(assoId: number): Promise<FundingDto[]> {
    return (await this.fundingRepository.findAll(assoId)) as FundingDto[];
  }

  public async update(id: number, updateFundingDto: UpdateFundingDto): Promise<FundingDto> {
    return (await this.fundingRepository.update(id, updateFundingDto as UpdateFundingModel)) as FundingDto;
  }

  public async getStats(assoId: number, optionStatFundingDto: OptionStatFundingDto): Promise<StatFundingDto> {
    const stats: StatFundingDto = {} as unknown;

    const startDate = optionStatFundingDto.startDate
      ? new Date(optionStatFundingDto.startDate)
      : await this.associationRepository.getCreationDate(assoId);
    const endDate = optionStatFundingDto.endDate ? new Date(optionStatFundingDto.endDate) : new Date();

    console.log('Dates ' + startDate + ' ' + endDate);

    if (optionStatFundingDto.startDate || optionStatFundingDto.endDate) {
      stats.sum = await this.getSumInInterval(assoId, { startDate, endDate });
    }

    if (optionStatFundingDto.nbAccepted) {
      stats.nbAccepted = await this.getNbAccepted(assoId);
    }

    if (optionStatFundingDto.nbRejected) {
      stats.nbRefused = await this.getNbRejected(assoId);
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

  private async getNbAccepted(assoId: number): Promise<number> {
    return this.fundingRepository.getNbAccepted(assoId);
  }

  private async getNbRejected(assoId: number): Promise<number> {
    return this.fundingRepository.getNbRejected(assoId);
  }
}
