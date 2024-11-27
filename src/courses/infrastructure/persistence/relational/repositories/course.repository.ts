import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Course } from '../../../../domain/course';
import { CourseRepository } from '../../course.repository';
import { CourseMapper } from '../mappers/course.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FilterCourseDto } from 'src/courses/dto/find-all-courses.dto';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { EnrollmentEntity } from '../../../../../enrollments/infrastructure/persistence/relational/entities/enrollment.entity';

@Injectable()
export class CourseRelationalRepository implements CourseRepository {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}

  async create(data: Course): Promise<Course> {
    const persistenceModel = CourseMapper.toPersistence(data);
    const newEntity = await this.courseRepository.save(
      this.courseRepository.create(persistenceModel),
    );
    return CourseMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    filterOptions,
    paginationOptions,
    userId,
  }: {
    userId?: string;
    filterOptions?: FilterCourseDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Course[]> {
    const where: FindOptionsWhere<CourseEntity> = {};
    if (filterOptions?.courseCreators?.length) {
      where.courseCreator = filterOptions.courseCreators.map(
        (user: UserEntity) => ({
          id: user.id,
        }),
      );
    }

    const entities = await this.courseRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
    });

    let courses = entities.map((entity) => CourseMapper.toDomain(entity));

    if (userId) {
      const enrolledCourses = await this.enrollmentRepository.find({
        where: {
          student: { id: userId },
          course: In(courses.map((course) => course.id)),
        },
        relations: ['course'],
      });

      const enrolledCourseIds = new Set(
        enrolledCourses.map((enrollment) => enrollment?.course?.id),
      );

      courses = courses.map((course) => ({
        ...course,
        hasEnrolled: enrolledCourseIds.has(course.id),
      }));
    }

    return courses;
  }

  async findById(id: Course['id']): Promise<NullableType<Course>> {
    const entity = await this.courseRepository.findOne({
      where: { id },
      relations: {
        courseLectures: true,
      },
    });

    return entity ? CourseMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Course['id'][]): Promise<Course[]> {
    const entities = await this.courseRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CourseMapper.toDomain(entity));
  }

  async update(id: Course['id'], payload: Partial<Course>): Promise<Course> {
    const entity = await this.courseRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.courseRepository.save(
      this.courseRepository.create(
        CourseMapper.toPersistence({
          ...CourseMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CourseMapper.toDomain(updatedEntity);
  }

  async remove(id: Course['id']): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
