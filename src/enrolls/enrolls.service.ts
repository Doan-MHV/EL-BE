import { Injectable } from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { UpdateEnrollDto } from './dto/update-enroll.dto';
import { EnrollRepository } from './infrastructure/persistence/enroll.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Enroll } from './domain/enroll';

@Injectable()
export class EnrollsService {
  constructor(
    // Dependencies here
    private readonly enrollRepository: EnrollRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createEnrollDto: CreateEnrollDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.enrollRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.enrollRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Enroll['id']) {
    return this.enrollRepository.findById(id);
  }

  findByIds(ids: Enroll['id'][]) {
    return this.enrollRepository.findByIds(ids);
  }

  async update(
    id: Enroll['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateEnrollDto: UpdateEnrollDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.enrollRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Enroll['id']) {
    return this.enrollRepository.remove(id);
  }
}
