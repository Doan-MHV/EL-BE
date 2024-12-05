import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { AssignmentSubmissionEntity } from '../entities/assignment-submission.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { AssignmentSubmission } from '../../../../domain/assignment-submission';
import { AssignmentSubmissionRepository } from '../../assignment-submission.repository';
import { AssignmentSubmissionMapper } from '../mappers/assignment-submission.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { AssignmentsEntity } from '../../../../../assignments/infrastructure/persistence/relational/entities/assignments.entity';
import { FilterAssignmentSubmissionsDto } from '../../../../dto/find-all-assignment-submissions.dto';
import { GradeEntity } from '../../../../../grades/infrastructure/persistence/relational/entities/grade.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { GradeMapper } from '../../../../../grades/infrastructure/persistence/relational/mappers/grade.mapper';

@Injectable()
export class AssignmentSubmissionRelationalRepository
  implements AssignmentSubmissionRepository
{
  constructor(
    @InjectRepository(AssignmentSubmissionEntity)
    private readonly assignmentSubmissionRepository: Repository<AssignmentSubmissionEntity>,
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
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
    filterOptions: FilterAssignmentSubmissionsDto | null;
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

    if (filterOptions?.students?.length) {
      where.student = filterOptions.students.map((student: UserEntity) => ({
        id: student.id,
      }));
    }

    // Fetch the assignment submissions
    const entities = await this.assignmentSubmissionRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      relations: ['assignment', 'student'], // Load relationships needed for grade checking
    });

    // Check for grades using the submission data
    const submissionsWithGrades = await Promise.all(
      entities.map(async (entity) => {
        const grade = await this.gradeRepository.findOne({
          where: {
            assignment: { id: entity.assignment?.id },
            student: { id: entity.student?.id },
          },
        });
        const isGraded = !!grade;
        const domainEntity = AssignmentSubmissionMapper.toDomain(entity);
        domainEntity.isGraded = isGraded;
        domainEntity.grade = isGraded ? GradeMapper.toDomain(grade) : null;
        return domainEntity;
      }),
    );

    return submissionsWithGrades;
  }

  async findById(
    id: AssignmentSubmission['id'],
  ): Promise<NullableType<AssignmentSubmission>> {
    const entity = await this.assignmentSubmissionRepository.findOne({
      where: { id },
      relations: {
        assignment: true,
        student: true,
      },
    });

    if (!entity) {
      return null;
    }

    // Look for the grade of the submission
    const gradeEntity = await this.gradeRepository.findOne({
      where: {
        assignment: { id: entity.assignment?.id },
        student: { id: entity.student?.id },
      },
    });

    const isGraded = !!gradeEntity;
    const domainEntity = AssignmentSubmissionMapper.toDomain(entity);
    domainEntity.isGraded = isGraded;
    domainEntity.grade = isGraded ? GradeMapper.toDomain(gradeEntity) : null; // Convert gradeEntity to its domain model

    return domainEntity;
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
