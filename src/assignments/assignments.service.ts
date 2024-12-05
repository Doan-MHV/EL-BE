import { Injectable } from '@nestjs/common';
import { CreateAssignmentsDto } from './dto/create-assignments.dto';
import { UpdateAssignmentsDto } from './dto/update-assignments.dto';
import { AssignmentsRepository } from './infrastructure/persistence/assignments.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Assignments } from './domain/assignments';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/domain/course';
import { FilterAssignmentDto } from './dto/find-all-assignments.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    // Dependencies here
    private readonly assignmentsRepository: AssignmentsRepository,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createAssignmentsDto: CreateAssignmentsDto) {
    // Do not remove comment below.
    // <creating-property />

    let course: Course | null | undefined = undefined;

    if (createAssignmentsDto.course?.id) {
      const id: Course['id'] = createAssignmentsDto.course?.id;
      course = await this.coursesService.findById(id);
    } else if (createAssignmentsDto.course === null) {
      course = null;
    }

    return this.assignmentsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createAssignmentsDto.name,
      description: createAssignmentsDto.description,
      maxGrade: createAssignmentsDto.maxGrade,
      deadline: createAssignmentsDto.deadline,
      status: createAssignmentsDto.status,
      course: course,
    });
  }

  findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterAssignmentDto | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.assignmentsRepository.findAllWithPagination({
      filterOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Assignments['id'], userId?: string) {
    return this.assignmentsRepository.findById(id, userId);
  }

  findByIds(ids: Assignments['id'][]) {
    return this.assignmentsRepository.findByIds(ids);
  }

  async update(
    id: Assignments['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAssignmentsDto: UpdateAssignmentsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.assignmentsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Assignments['id']) {
    return this.assignmentsRepository.remove(id);
  }
}
