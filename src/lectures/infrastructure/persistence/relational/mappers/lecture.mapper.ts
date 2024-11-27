import { CourseMapper } from 'src/courses/infrastructure/persistence/relational/mappers/course.mapper';
import { Lecture } from '../../../../domain/lecture';
import { LectureEntity } from '../entities/lecture.entity';
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';

export class LectureMapper {
  static toDomain(raw: LectureEntity): Lecture {
    const domainEntity = new Lecture();
    domainEntity.id = raw.id;
    domainEntity.lectureName = raw.lectureName;
    domainEntity.lectureTime = raw.lectureTime;
    domainEntity.lectureDate = raw.lectureDate;
    if (raw.course) {
      domainEntity.course = CourseMapper.toDomain(raw.course);
    }
    domainEntity.markdownContent = raw.markdownContent;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Lecture): LectureEntity {
    let course: CourseEntity | undefined = undefined;

    if (domainEntity.course) {
      course = new CourseEntity();
      course.id = domainEntity.course.id;
    }

    const persistenceEntity = new LectureEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.lectureName = domainEntity.lectureName;
    persistenceEntity.lectureTime = domainEntity.lectureTime;
    persistenceEntity.lectureDate = domainEntity.lectureDate;
    persistenceEntity.markdownContent = domainEntity.markdownContent;
    persistenceEntity.course = course;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}
