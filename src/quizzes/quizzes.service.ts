import { Injectable } from '@nestjs/common';
import { CreateQuizzesDto } from './dto/create-quizzes.dto';
import { UpdateQuizzesDto } from './dto/update-quizzes.dto';
import { QuizzesRepository } from './infrastructure/persistence/quizzes.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Quizzes } from './domain/quizzes';
import { CoursesService } from '../courses/courses.service';
import { Course } from '../courses/domain/course';

@Injectable()
export class QuizzesService {
  constructor(
    // Dependencies here
    private readonly quizzesRepository: QuizzesRepository,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createQuizzesDto: CreateQuizzesDto) {
    // Do not remove comment below.
    // <creating-property />

    let course: Course | null | undefined = undefined;

    if (createQuizzesDto.course?.id) {
      const id: Course['id'] = createQuizzesDto.course?.id;
      course = await this.coursesService.findById(id);
    } else if (createQuizzesDto.course === null) {
      course = null;
    }

    return this.quizzesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      title: createQuizzesDto.title,
      course: course,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.quizzesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Quizzes['id']) {
    return this.quizzesRepository.findById(id);
  }

  findByIds(ids: Quizzes['id'][]) {
    return this.quizzesRepository.findByIds(ids);
  }

  async update(
    id: Quizzes['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateQuizzesDto: UpdateQuizzesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.quizzesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Quizzes['id']) {
    return this.quizzesRepository.remove(id);
  }
}
