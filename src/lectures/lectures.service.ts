import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { LectureRepository } from './infrastructure/persistence/lecture.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Lecture } from './domain/lecture';
import { Course } from 'src/courses/domain/course';
import { CoursesService } from 'src/courses/courses.service';
import { FilterLectureDto } from './dto/find-all-lectures.dto';

@Injectable()
export class LecturesService {
  constructor(
    // Dependencies here
    private readonly lectureRepository: LectureRepository,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createLectureDto: CreateLectureDto) {
    // Do not remove comment below.
    // <creating-property />

    let course: Course | null | undefined = undefined;

    if (createLectureDto.course?.id) {
      const id: Course['id'] = createLectureDto.course?.id;
      course = await this.coursesService.findById(id);
    } else if (createLectureDto.course === null) {
      course = null;
    }

    // if (createLectureDto.previousLecture?.id) {
    //   const id: Lecture['id'] = createLectureDto.previousLecture?.id;
    //   await this.lectureRepository.update(id, payload)
    // }

    return this.lectureRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      lectureName: createLectureDto.lectureName,
      markdownContent: createLectureDto.markdownContent,
      lectureTime: createLectureDto.lectureTime,
      lectureDate: createLectureDto.lectureDate,
      course: course,
    });
  }

  findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLectureDto | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.lectureRepository.findAllWithPagination({
      filterOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Lecture['id']) {
    return this.lectureRepository.findById(id);
  }

  findByIds(ids: Lecture['id'][]) {
    return this.lectureRepository.findByIds(ids);
  }

  async update(
    id: Lecture['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateLectureDto: UpdateLectureDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.lectureRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Lecture['id']) {
    return this.lectureRepository.remove(id);
  }
}
