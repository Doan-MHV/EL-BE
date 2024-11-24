import { CourseMapper } from 'src/courses/infrastructure/persistence/relational/mappers/course.mapper';
import { Assignments } from '../../../../domain/assignments';
import { AssignmentsEntity } from '../entities/assignments.entity';
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';
import { AssignmentMaterialsMapper } from 'src/assignment-materials/infrastructure/persistence/relational/mappers/assignment-materials.mapper';

export class AssignmentsMapper {
  static toDomain(raw: AssignmentsEntity): Assignments {
    const domainEntity = new Assignments();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.deadline = raw.deadline;
    domainEntity.status = raw.status;
    if (raw.course) {
      domainEntity.course = CourseMapper.toDomain(raw.course);
    }
    if (raw.assignmentMaterials) {
      domainEntity.assignmentsMaterials = raw.assignmentMaterials?.map(
        (assignmentMaterials) =>
          AssignmentMaterialsMapper.toDomain(assignmentMaterials) || [],
      );
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Assignments): AssignmentsEntity {
    let course: CourseEntity | undefined = undefined;

    if (domainEntity.course) {
      course = new CourseEntity();
      course.id = domainEntity.course.id;
    }

    const persistenceEntity = new AssignmentsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.deadline = domainEntity.deadline;
    persistenceEntity.status = domainEntity.status;
    persistenceEntity.course = course;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}
