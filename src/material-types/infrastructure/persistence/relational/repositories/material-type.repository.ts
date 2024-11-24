import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MaterialTypeEntity } from '../entities/material-type.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { MaterialType } from '../../../../domain/material-type';
import { MaterialTypeRepository } from '../../material-type.repository';
import { MaterialTypeMapper } from '../mappers/material-type.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class MaterialTypeRelationalRepository
  implements MaterialTypeRepository
{
  constructor(
    @InjectRepository(MaterialTypeEntity)
    private readonly materialTypeRepository: Repository<MaterialTypeEntity>,
  ) {}

  async create(data: MaterialType): Promise<MaterialType> {
    const persistenceModel = MaterialTypeMapper.toPersistence(data);
    const newEntity = await this.materialTypeRepository.save(
      this.materialTypeRepository.create(persistenceModel),
    );
    return MaterialTypeMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<MaterialType[]> {
    const entities = await this.materialTypeRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => MaterialTypeMapper.toDomain(entity));
  }

  async findById(id: MaterialType['id']): Promise<NullableType<MaterialType>> {
    const entity = await this.materialTypeRepository.findOne({
      where: { id },
    });

    return entity ? MaterialTypeMapper.toDomain(entity) : null;
  }

  async findByIds(ids: MaterialType['id'][]): Promise<MaterialType[]> {
    const entities = await this.materialTypeRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => MaterialTypeMapper.toDomain(entity));
  }

  async update(
    id: MaterialType['id'],
    payload: Partial<MaterialType>,
  ): Promise<MaterialType> {
    const entity = await this.materialTypeRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.materialTypeRepository.save(
      this.materialTypeRepository.create(
        MaterialTypeMapper.toPersistence({
          ...MaterialTypeMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return MaterialTypeMapper.toDomain(updatedEntity);
  }

  async remove(id: MaterialType['id']): Promise<void> {
    await this.materialTypeRepository.delete(id);
  }
}
