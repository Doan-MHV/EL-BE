import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentRepository } from './infrastructure/persistence/enrollment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Enrollment } from './domain/enrollment';
import { Course } from '../courses/domain/course';
import { CoursesService } from '../courses/courses.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';
import { FilterEnrollmentDto } from './dto/find-all-enrollments.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    // Dependencies here
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly coursesService: CoursesService,
    private readonly usersService: UsersService,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    // Do not remove comment below.
    // <creating-property />

    let course: Course | null | undefined = undefined;

    if (createEnrollmentDto.course?.id) {
      const id: Course['id'] = createEnrollmentDto.course?.id;
      course = await this.coursesService.findById(id);
    } else if (createEnrollmentDto.course === null) {
      course = null;
    }

    let student: User | null | undefined = undefined;

    if (createEnrollmentDto.student?.id) {
      const id: User['id'] = createEnrollmentDto.student?.id;
      student = await this.usersService.findById(id);
    } else if (createEnrollmentDto.course === null) {
      student = null;
    }

    return this.enrollmentRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      course: course,
      student: student,
    });
  }

  findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterEnrollmentDto | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.enrollmentRepository.findAllWithPagination({
      filterOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findAllCoursesWithPagination({
    studentId,
    filterOptions,
    paginationOptions,
  }: {
    studentId: string;
    filterOptions?: FilterEnrollmentDto | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.enrollmentRepository.findCoursesByStudentId({
      studentId,
      filterOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Enrollment['id']) {
    return this.enrollmentRepository.findById(id);
  }

  findByIds(ids: Enrollment['id'][]) {
    return this.enrollmentRepository.findByIds(ids);
  }

  async update(
    id: Enrollment['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.enrollmentRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Enrollment['id']) {
    return this.enrollmentRepository.remove(id);
  }
}
