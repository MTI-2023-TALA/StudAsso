import { CreateFundingDto, FundingDto, UpdateFundingDto } from '@stud-asso/shared/dtos';
import { CreateFundingModel, UpdateFundingModel } from '@stud-asso/backend/core/model';

import { FundingRepository } from '@stud-asso/backend/core/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FundingService {
  constructor(private readonly fundingRepository: FundingRepository) {}

  async create(assoId: number, userId: number, createFundingDto: CreateFundingDto): Promise<FundingDto> {
    return (await this.fundingRepository.create(assoId, userId, createFundingDto as CreateFundingModel)) as FundingDto;
  }

  findAll(assoId: number) {
    return this.fundingRepository.findAll(assoId);
  }

  update(id: number, updateFundingDto: UpdateFundingDto) {
    return this.fundingRepository.update(id, updateFundingDto as UpdateFundingModel);
  }
}
