import { Grade } from '../../../../domain/grade';
import { GradeEntity } from '../entities/grade.entity';
import { CourseMapper } from '../../../../../courses/infrastructure/persistence/relational/mappers/course.mapper';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { QuizzesMapper } from '../../../../../quizzes/infrastructure/persistence/relational/mappers/quizzes.mapper';
import { AssignmentsMapper } from '../../../../../assignments/infrastructure/persistence/relational/mappers/assignments.mapper';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { QuizzesEntity } from '../../../../../quizzes/infrastructure/persistence/relational/entities/quizzes.entity';
import { AssignmentsEntity } from '../../../../../assignments/infrastructure/persistence/relational/entities/assignments.entity';

export class GradeMapper {
  static toDomain(raw: GradeEntity): Grade {
    const domainEntity = new Grade();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.feedback = raw.feedback;
    domainEntity.grade = raw.grade;
    domainEntity.maxGrade = raw.maxGrade;
    if (raw.course) {
      domainEntity.course = CourseMapper.toDomain(raw.course);
    }
    if (raw.student) {
      domainEntity.student = UserMapper.toDomain(raw.student);
    }
    if (raw.quiz) {
      domainEntity.quiz = QuizzesMapper.toDomain(raw.quiz);
    }
    if (raw.assignment) {
      domainEntity.assignment = AssignmentsMapper.toDomain(raw.assignment);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Grade): GradeEntity {
    let course: CourseEntity | undefined = undefined;

    if (domainEntity.course) {
      course = new CourseEntity();
      course.id = domainEntity.course.id;
    }

    let student: UserEntity | undefined = undefined;
    if (domainEntity.student) {
      student = new UserEntity();
      student.id = domainEntity.student.id;
    }

    let quiz: QuizzesEntity | undefined = undefined;
    if (domainEntity.quiz) {
      quiz = new QuizzesEntity();
      quiz.id = domainEntity.quiz.id;
    }

    let assignment: AssignmentsEntity | undefined = undefined;
    if (domainEntity.assignment) {
      assignment = new AssignmentsEntity();
      assignment.id = domainEntity.assignment.id;
    }

    const persistenceEntity = new GradeEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.feedback = domainEntity.feedback;
    persistenceEntity.grade = domainEntity.grade;
    persistenceEntity.maxGrade = domainEntity.maxGrade;
    persistenceEntity.course = course;
    persistenceEntity.student = student;
    persistenceEntity.quiz = quiz;
    persistenceEntity.assignment = assignment;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
