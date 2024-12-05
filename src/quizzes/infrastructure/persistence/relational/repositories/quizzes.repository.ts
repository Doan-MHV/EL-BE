import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { QuizzesEntity } from '../entities/quizzes.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Quizzes } from '../../../../domain/quizzes';
import { QuizzesRepository } from '../../quizzes.repository';
import { QuizzesMapper } from '../mappers/quizzes.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { FilterQuizDto } from '../../../../dto/find-all-quizzes.dto';
import { GradeEntity } from '../../../../../grades/infrastructure/persistence/relational/entities/grade.entity';

@Injectable()
export class QuizzesRelationalRepository implements QuizzesRepository {
  constructor(
    @InjectRepository(QuizzesEntity)
    private readonly quizzesRepository: Repository<QuizzesEntity>,
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
  ) {}

  async create(data: Quizzes): Promise<Quizzes> {
    const persistenceModel = QuizzesMapper.toPersistence(data);
    const newEntity = await this.quizzesRepository.save(
      this.quizzesRepository.create(persistenceModel),
    );
    return QuizzesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    userId,
    filterOptions,
    paginationOptions,
  }: {
    userId?: string;
    filterOptions?: FilterQuizDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Quizzes[]> {
    const where: FindOptionsWhere<QuizzesEntity> = {};

    if (filterOptions?.courses?.length) {
      where.course = filterOptions.courses.map((course: CourseEntity) => ({
        id: course.id,
      }));
    }

    const entities = await this.quizzesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: {
        title: 'ASC',
      },
    });

    return await Promise.all(
      entities.map(async (entity) => {
        // Check if there's a grade for the quiz and the specified userId, indicating it has been "taken" by this user
        const gradeCount = await this.gradeRepository.count({
          where: {
            quiz: { id: entity.id },
            student: { id: userId }, // Add userId to the query condition
          },
        });

        const isTaken = gradeCount > 0;

        // Map the quiz entity to its domain model with the isTaken flag
        const domainEntity = QuizzesMapper.toDomain(entity);
        domainEntity.isTaken = isTaken;

        return domainEntity;
      }),
    );
  }

  async findById(id: Quizzes['id']): Promise<NullableType<Quizzes>> {
    const entity = await this.quizzesRepository.findOne({
      where: { id },
    });

    return entity ? QuizzesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Quizzes['id'][]): Promise<Quizzes[]> {
    const entities = await this.quizzesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => QuizzesMapper.toDomain(entity));
  }

  async update(id: Quizzes['id'], payload: Partial<Quizzes>): Promise<Quizzes> {
    const entity = await this.quizzesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.quizzesRepository.save(
      this.quizzesRepository.create(
        QuizzesMapper.toPersistence({
          ...QuizzesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return QuizzesMapper.toDomain(updatedEntity);
  }

  async remove(id: Quizzes['id']): Promise<void> {
    await this.quizzesRepository.delete(id);
  }
}
