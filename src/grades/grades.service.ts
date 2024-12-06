import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { GradeRepository } from './infrastructure/persistence/grade.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Grade } from './domain/grade';
import { Course } from '../courses/domain/course';
import { CoursesService } from '../courses/courses.service';
import { QuizzesService } from '../quizzes/quizzes.service';
import { AssignmentsService } from '../assignments/assignments.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';
import { Assignments } from '../assignments/domain/assignments';
import { Quizzes } from '../quizzes/domain/quizzes';
import { FilterGradesDto } from './dto/find-all-grades.dto';
import { MailService } from '../mail/mail.service';

function setTypeNameAndName(
  assignment?: Assignments | null,
  quiz?: Quizzes | null,
) {
  let typeName = '';
  let name = '';

  if (assignment !== undefined) {
    typeName = 'Assignment';
    name = assignment?.name ?? '';
  } else if (quiz !== undefined) {
    typeName = 'Quiz';
    name = quiz?.title ?? '';
  }

  return { typeName, name };
}

@Injectable()
export class GradesService {
  constructor(
    // Dependencies here
    private readonly gradeRepository: GradeRepository,
    private readonly coursesService: CoursesService,
    private readonly quizzesService: QuizzesService,
    private readonly assignmentsService: AssignmentsService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createGradeDto: CreateGradeDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    let course: Course | null | undefined = undefined;

    if (createGradeDto.course?.id) {
      const id: Course['id'] = createGradeDto.course?.id;
      course = await this.coursesService.findById(id);
    } else if (createGradeDto.course === null) {
      course = null;
    }

    let student: User | null | undefined = undefined;

    if (createGradeDto.student?.id) {
      const id: User['id'] = createGradeDto.student?.id;
      student = await this.userService.findById(id);
    } else if (createGradeDto.student === null) {
      student = null;
    }

    let assignment: Assignments | null | undefined = undefined;

    if (createGradeDto.assignment?.id) {
      const id: Assignments['id'] = createGradeDto.assignment?.id;
      assignment = await this.assignmentsService.findById(id);
    } else if (createGradeDto.assignment === null) {
      assignment = null;
    }

    let quiz: Quizzes | null | undefined = undefined;

    if (createGradeDto.quiz?.id) {
      const id: Quizzes['id'] = createGradeDto.quiz?.id;
      quiz = await this.quizzesService.findById(id);
    } else if (createGradeDto.quiz === null) {
      quiz = null;
    }

    await this.mailService.gradeFeedback({
      to: student?.email ?? '',
      data: {
        ...setTypeNameAndName(assignment, quiz),
        courseId: course?.id ?? '',
        instructorName: `${course?.courseCreator?.lastName} ${course?.courseCreator?.firstName}`,
        instructorEmail: course?.courseCreator?.email ?? '',
        feedback: createGradeDto.feedback ?? '',
        studentName: `${student?.lastName} ${student?.firstName} `,
        courseName: course?.courseName ?? '',
        grade: createGradeDto.grade,
        maxGrade: createGradeDto.maxGrade,
      },
    });

    return this.gradeRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createGradeDto.name,
      feedback: createGradeDto.feedback,
      grade: createGradeDto.grade,
      maxGrade: createGradeDto.maxGrade,
      course: course,
      student: student,
      assignment: assignment,
      quiz: quiz,
    });
  }

  findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterGradesDto | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.gradeRepository.findAllWithPagination({
      filterOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Grade['id']) {
    return this.gradeRepository.findById(id);
  }

  findByIds(ids: Grade['id'][]) {
    return this.gradeRepository.findByIds(ids);
  }

  async update(
    id: Grade['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateGradeDto: UpdateGradeDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.gradeRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Grade['id']) {
    return this.gradeRepository.remove(id);
  }
}
