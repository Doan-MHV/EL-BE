import { Enrollment } from '../../../../domain/enrollment';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { CourseMapper } from '../../../../../courses/infrastructure/persistence/relational/mappers/course.mapper';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { CourseEntity } from '../../../../../courses/infrastructure/persistence/relational/entities/course.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

export class EnrollmentMapper {
  static toDomain(raw: EnrollmentEntity): Enrollment {
    const domainEntity = new Enrollment();
    domainEntity.id = raw.id;
    if (raw.course) {
      domainEntity.course = CourseMapper.toDomain(raw.course);
    }
    if (raw.student) {
      domainEntity.student = UserMapper.toDomain(raw.student);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Enrollment): EnrollmentEntity {
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

    const persistenceEntity = new EnrollmentEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.course = course;
    persistenceEntity.student = student;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
