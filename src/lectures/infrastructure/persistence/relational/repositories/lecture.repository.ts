import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { LectureEntity } from '../entities/lecture.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Lecture } from '../../../../domain/lecture';
import { LectureRepository } from '../../lecture.repository';
import { LectureMapper } from '../mappers/lecture.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FilterLectureDto } from 'src/lectures/dto/find-all-lectures.dto';
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';

@Injectable()
export class LectureRelationalRepository implements LectureRepository {
  constructor(
    @InjectRepository(LectureEntity)
    private readonly lectureRepository: Repository<LectureEntity>,
  ) {}

  async create(data: Lecture): Promise<Lecture> {
    const persistenceModel = LectureMapper.toPersistence(data);
    const newEntity = await this.lectureRepository.save(
      this.lectureRepository.create(persistenceModel),
    );
    return LectureMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLectureDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Lecture[]> {
    const where: FindOptionsWhere<LectureEntity> = {};
    if (filterOptions?.courses?.length) {
      where.course = filterOptions.courses.map((course: CourseEntity) => ({
        id: course.id,
      }));
    }

    const entities = await this.lectureRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
    });

    return entities.map((entity) => LectureMapper.toDomain(entity));
  }

  async findById(id: Lecture['id']): Promise<NullableType<Lecture>> {
    const entity = await this.lectureRepository.findOne({
      where: { id },
    });

    return entity ? LectureMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Lecture['id'][]): Promise<Lecture[]> {
    const entities = await this.lectureRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => LectureMapper.toDomain(entity));
  }

  async update(id: Lecture['id'], payload: Partial<Lecture>): Promise<Lecture> {
    const entity = await this.lectureRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.lectureRepository.save(
      this.lectureRepository.create(
        LectureMapper.toPersistence({
          ...LectureMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LectureMapper.toDomain(updatedEntity);
  }

  async remove(id: Lecture['id']): Promise<void> {
    await this.lectureRepository.delete(id);
  }
}
