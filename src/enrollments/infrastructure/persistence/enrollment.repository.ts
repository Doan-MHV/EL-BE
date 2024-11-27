import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Enrollment } from '../../domain/enrollment';
import { FilterEnrollmentDto } from '../../dto/find-all-enrollments.dto';
import { Course } from '../../../courses/domain/course';

export abstract class EnrollmentRepository {
  abstract create(
    data: Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Enrollment>;

  abstract findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterEnrollmentDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Enrollment[]>;

  abstract findById(id: Enrollment['id']): Promise<NullableType<Enrollment>>;

  abstract findByIds(ids: Enrollment['id'][]): Promise<Enrollment[]>;

  abstract update(
    id: Enrollment['id'],
    payload: DeepPartial<Enrollment>,
  ): Promise<Enrollment | null>;

  abstract remove(id: Enrollment['id']): Promise<void>;

  abstract findCoursesByStudentId({
    studentId,
    filterOptions,
    paginationOptions,
  }: {
    studentId: string;
    filterOptions?: FilterEnrollmentDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Course[]>;
}
