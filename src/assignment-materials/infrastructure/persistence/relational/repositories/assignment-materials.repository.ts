import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { AssignmentMaterialsEntity } from '../entities/assignment-materials.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { AssignmentMaterials } from '../../../../domain/assignment-materials';
import { AssignmentMaterialsRepository } from '../../assignment-materials.repository';
import { AssignmentMaterialsMapper } from '../mappers/assignment-materials.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FilterAssignmentMaterialsDto } from '../../../../dto/find-all-assignment-materials.dto';
import { AssignmentSubmissionEntity } from '../../../../../assignment-submissions/infrastructure/persistence/relational/entities/assignment-submission.entity';
import { AssignmentsEntity } from '../../../../../assignments/infrastructure/persistence/relational/entities/assignments.entity';

@Injectable()
export class AssignmentMaterialsRelationalRepository
  implements AssignmentMaterialsRepository
{
  constructor(
    @InjectRepository(AssignmentMaterialsEntity)
    private readonly assignmentMaterialsRepository: Repository<AssignmentMaterialsEntity>,
  ) {}

  async create(data: AssignmentMaterials): Promise<AssignmentMaterials> {
    const persistenceModel = AssignmentMaterialsMapper.toPersistence(data);
    const newEntity = await this.assignmentMaterialsRepository.save(
      this.assignmentMaterialsRepository.create(persistenceModel),
    );
    return AssignmentMaterialsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions: FilterAssignmentMaterialsDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<AssignmentMaterials[]> {
    const where: FindOptionsWhere<AssignmentSubmissionEntity> = {};
    if (filterOptions?.assignments?.length) {
      where.assignment = filterOptions.assignments.map(
        (assignment: AssignmentsEntity) => ({
          id: assignment.id,
        }),
      );
    }

    const entities = await this.assignmentMaterialsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
    });

    return entities.map((entity) => AssignmentMaterialsMapper.toDomain(entity));
  }

  async findById(
    id: AssignmentMaterials['id'],
  ): Promise<NullableType<AssignmentMaterials>> {
    const entity = await this.assignmentMaterialsRepository.findOne({
      where: { id },
    });

    return entity ? AssignmentMaterialsMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: AssignmentMaterials['id'][],
  ): Promise<AssignmentMaterials[]> {
    const entities = await this.assignmentMaterialsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AssignmentMaterialsMapper.toDomain(entity));
  }

  async update(
    id: AssignmentMaterials['id'],
    payload: Partial<AssignmentMaterials>,
  ): Promise<AssignmentMaterials> {
    const entity = await this.assignmentMaterialsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.assignmentMaterialsRepository.save(
      this.assignmentMaterialsRepository.create(
        AssignmentMaterialsMapper.toPersistence({
          ...AssignmentMaterialsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AssignmentMaterialsMapper.toDomain(updatedEntity);
  }

  async remove(id: AssignmentMaterials['id']): Promise<void> {
    await this.assignmentMaterialsRepository.delete(id);
  }
}
