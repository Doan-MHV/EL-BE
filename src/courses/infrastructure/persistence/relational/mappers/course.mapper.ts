import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { Course } from '../../../../domain/course';
import { CourseEntity } from '../entities/course.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { LectureMapper } from 'src/lectures/infrastructure/persistence/relational/mappers/lecture.mapper';
import { AssignmentsMapper } from 'src/assignments/infrastructure/persistence/relational/mappers/assignments.mapper';

export class CourseMapper {
  static toDomain(raw: CourseEntity): Course {
    const domainEntity = new Course();
    domainEntity.id = raw.id;
    domainEntity.courseName = raw.courseName;
    domainEntity.categoryType = raw.categoryType;
    domainEntity.coursePrice = raw.coursePrice;
    if (raw.courseCreator) {
      domainEntity.courseCreator = UserMapper.toDomain(raw.courseCreator);
    }
    if (raw.courseLectures) {
      domainEntity.courseLectures =
        raw.courseLectures?.map((courseLecture) =>
          LectureMapper.toDomain(courseLecture),
        ) || [];
    }
    if (raw.courseAssignments) {
      domainEntity.courseAssignments =
        raw.courseAssignments?.map((courseAssignment) =>
          AssignmentsMapper.toDomain(courseAssignment),
        ) || [];
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Course): CourseEntity {
    let courseCreator: UserEntity | undefined = undefined;

    if (domainEntity.courseCreator) {
      courseCreator = new UserEntity();
      courseCreator.id = domainEntity.courseCreator.id;
    }

    const persistenceEntity = new CourseEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.courseName = domainEntity.courseName;
    persistenceEntity.categoryType = domainEntity.categoryType;
    persistenceEntity.coursePrice = domainEntity.coursePrice;
    persistenceEntity.courseCreator = courseCreator;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}
