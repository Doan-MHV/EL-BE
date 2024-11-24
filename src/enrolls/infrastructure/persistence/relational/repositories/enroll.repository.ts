import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { EnrollEntity } from '../entities/enroll.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Enroll } from '../../../../domain/enroll';
import { EnrollRepository } from '../../enroll.repository';
import { EnrollMapper } from '../mappers/enroll.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class EnrollRelationalRepository implements EnrollRepository {
  constructor(
    @InjectRepository(EnrollEntity)
    private readonly enrollRepository: Repository<EnrollEntity>,
  ) {}

  async create(data: Enroll): Promise<Enroll> {
    const persistenceModel = EnrollMapper.toPersistence(data);
    const newEntity = await this.enrollRepository.save(
      this.enrollRepository.create(persistenceModel),
    );
    return EnrollMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Enroll[]> {
    const entities = await this.enrollRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => EnrollMapper.toDomain(entity));
  }

  async findById(id: Enroll['id']): Promise<NullableType<Enroll>> {
    const entity = await this.enrollRepository.findOne({
      where: { id },
    });

    return entity ? EnrollMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Enroll['id'][]): Promise<Enroll[]> {
    const entities = await this.enrollRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => EnrollMapper.toDomain(entity));
  }

  async update(id: Enroll['id'], payload: Partial<Enroll>): Promise<Enroll> {
    const entity = await this.enrollRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.enrollRepository.save(
      this.enrollRepository.create(
        EnrollMapper.toPersistence({
          ...EnrollMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return EnrollMapper.toDomain(updatedEntity);
  }

  async remove(id: Enroll['id']): Promise<void> {
    await this.enrollRepository.delete(id);
  }
}
