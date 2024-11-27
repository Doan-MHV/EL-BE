import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { AssignmentsEntity } from '../entities/assignments.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Assignments } from '../../../../domain/assignments';
import { AssignmentsRepository } from '../../assignments.repository';
import { AssignmentsMapper } from '../mappers/assignments.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';
import { FilterAssignmentDto } from 'src/assignments/dto/find-all-assignments.dto';

@Injectable()
export class AssignmentsRelationalRepository implements AssignmentsRepository {
  constructor(
    @InjectRepository(AssignmentsEntity)
    private readonly assignmentsRepository: Repository<AssignmentsEntity>,
  ) {}

  async create(data: Assignments): Promise<Assignments> {
    const persistenceModel = AssignmentsMapper.toPersistence(data);
    const newEntity = await this.assignmentsRepository.save(
      this.assignmentsRepository.create(persistenceModel),
    );
    return AssignmentsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterAssignmentDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Assignments[]> {
    const where: FindOptionsWhere<AssignmentsEntity> = {};
    if (filterOptions?.courses?.length) {
      where.course = filterOptions.courses.map((course: CourseEntity) => ({
        id: course.id,
      }));
    }

    const entities = await this.assignmentsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: {
        name: 'ASC',
      },
    });

    return entities.map((entity) => AssignmentsMapper.toDomain(entity));
  }

  async findById(id: Assignments['id']): Promise<NullableType<Assignments>> {
    const entity = await this.assignmentsRepository.findOne({
      where: { id },
    });

    return entity ? AssignmentsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Assignments['id'][]): Promise<Assignments[]> {
    const entities = await this.assignmentsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AssignmentsMapper.toDomain(entity));
  }

  async update(
    id: Assignments['id'],
    payload: Partial<Assignments>,
  ): Promise<Assignments> {
    const entity = await this.assignmentsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.assignmentsRepository.save(
      this.assignmentsRepository.create(
        AssignmentsMapper.toPersistence({
          ...AssignmentsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AssignmentsMapper.toDomain(updatedEntity);
  }

  async remove(id: Assignments['id']): Promise<void> {
    await this.assignmentsRepository.delete(id);
  }
}
