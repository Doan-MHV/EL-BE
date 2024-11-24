import { Quizzes } from '../../../../domain/quizzes';
import { QuizzesEntity } from '../entities/quizzes.entity';
import { CourseMapper } from '../../../../../courses/infrastructure/persistence/relational/mappers/course.mapper';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';

export class QuizzesMapper {
  static toDomain(raw: QuizzesEntity): Quizzes {
    const domainEntity = new Quizzes();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    if (raw.course) {
      domainEntity.course = CourseMapper.toDomain(raw.course);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Quizzes): QuizzesEntity {
    let course: CourseEntity | undefined = undefined;

    if (domainEntity.course) {
      course = new CourseEntity();
      course.id = domainEntity.course.id;
    }

    const persistenceEntity = new QuizzesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.course = course;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
