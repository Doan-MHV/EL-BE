import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { AssignmentSubmissionEntity } from '../entities/assignment-submission.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { AssignmentSubmission } from '../../../../domain/assignment-submission';
import { AssignmentSubmissionRepository } from '../../assignment-submission.repository';
import { AssignmentSubmissionMapper } from '../mappers/assignment-submission.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FilterAssignmentMaterialsDto } from '../../../../../assignment-materials/dto/find-all-assignment-materials.dto';
import { AssignmentsEntity } from '../../../../../assignments/infrastructure/persistence/relational/entities/assignments.entity';

@Injectable()
export class AssignmentSubmissionRelationalRepository
  implements AssignmentSubmissionRepository
{
  constructor(
    @InjectRepository(AssignmentSubmissionEntity)
    private readonly assignmentSubmissionRepository: Repository<AssignmentSubmissionEntity>,
  ) {}

  async create(data: AssignmentSubmission): Promise<AssignmentSubmission> {
    const persistenceModel = AssignmentSubmissionMapper.toPersistence(data);
    const newEntity = await this.assignmentSubmissionRepository.save(
      this.assignmentSubmissionRepository.create(persistenceModel),
    );
    return AssignmentSubmissionMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions: FilterAssignmentMaterialsDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<AssignmentSubmission[]> {
    const where: FindOptionsWhere<AssignmentSubmissionEntity> = {};
    if (filterOptions?.assignments?.length) {
      where.assignment = filterOptions.assignments.map(
        (assignment: AssignmentsEntity) => ({
          id: assignment.id,
        }),
      );
    }

    const entities = await this.assignmentSubmissionRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
    });

    return entities.map((entity) =>
      AssignmentSubmissionMapper.toDomain(entity),
    );
  }

  async findById(
    id: AssignmentSubmission['id'],
  ): Promise<NullableType<AssignmentSubmission>> {
    const entity = await this.assignmentSubmissionRepository.findOne({
      where: { id },
    });

    return entity ? AssignmentSubmissionMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: AssignmentSubmission['id'][],
  ): Promise<AssignmentSubmission[]> {
    const entities = await this.assignmentSubmissionRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      AssignmentSubmissionMapper.toDomain(entity),
    );
  }

  async update(
    id: AssignmentSubmission['id'],
    payload: Partial<AssignmentSubmission>,
  ): Promise<AssignmentSubmission> {
    const entity = await this.assignmentSubmissionRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.assignmentSubmissionRepository.save(
      this.assignmentSubmissionRepository.create(
        AssignmentSubmissionMapper.toPersistence({
          ...AssignmentSubmissionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AssignmentSubmissionMapper.toDomain(updatedEntity);
  }

  async remove(id: AssignmentSubmission['id']): Promise<void> {
    await this.assignmentSubmissionRepository.delete(id);
  }
}
