import { Injectable } from '@nestjs/common';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';
import { MaterialTypeRepository } from './infrastructure/persistence/material-type.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { MaterialType } from './domain/material-type';

@Injectable()
export class MaterialTypesService {
  constructor(
    // Dependencies here
    private readonly materialTypeRepository: MaterialTypeRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createMaterialTypeDto: CreateMaterialTypeDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.materialTypeRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.materialTypeRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: MaterialType['id']) {
    return this.materialTypeRepository.findById(id);
  }

  findByIds(ids: MaterialType['id'][]) {
    return this.materialTypeRepository.findByIds(ids);
  }

  async update(
    id: MaterialType['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateMaterialTypeDto: UpdateMaterialTypeDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.materialTypeRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: MaterialType['id']) {
    return this.materialTypeRepository.remove(id);
  }
}
