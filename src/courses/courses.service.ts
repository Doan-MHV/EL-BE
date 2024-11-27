import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository } from './infrastructure/persistence/course.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Course } from './domain/course';
import { User } from 'src/users/domain/user';
import { UsersService } from 'src/users/users.service';
import { FilterCourseDto } from './dto/find-all-courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    // Dependencies here
    private readonly courseRepository: CourseRepository,
    private readonly userService: UsersService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    // Do not remove comment below.
    // <creating-property />

    let courseCreator: User | null | undefined = undefined;

    if (createCourseDto.courseCreator?.id) {
      const id: User['id'] = createCourseDto.courseCreator?.id;
      courseCreator = await this.userService.findById(id);
    } else if (createCourseDto.courseCreator === null) {
      courseCreator = null;
    }

    return this.courseRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      courseName: createCourseDto.courseName,
      categoryType: createCourseDto.categoryType,
      coursePrice: createCourseDto.coursePrice,
      courseCreator: courseCreator,
    });
  }

  findAllWithPagination({
    filterOptions,
    paginationOptions,
    userId,
  }: {
    userId: string;
    filterOptions?: FilterCourseDto | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.courseRepository.findAllWithPagination({
      userId,
      filterOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Course['id']) {
    return this.courseRepository.findById(id);
  }

  findByIds(ids: Course['id'][]) {
    return this.courseRepository.findByIds(ids);
  }

  async update(
    id: Course['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateCourseDto: UpdateCourseDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.courseRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Course['id']) {
    return this.courseRepository.remove(id);
  }
}
