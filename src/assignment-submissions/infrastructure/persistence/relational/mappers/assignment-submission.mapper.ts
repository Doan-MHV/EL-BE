import { AssignmentSubmission } from '../../../../domain/assignment-submission';
import { AssignmentSubmissionEntity } from '../entities/assignment-submission.entity';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';
import { AssignmentsMapper } from '../../../../../assignments/infrastructure/persistence/relational/mappers/assignments.mapper';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { AssignmentsEntity } from '../../../../../assignments/infrastructure/persistence/relational/entities/assignments.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

export class AssignmentSubmissionMapper {
  static toDomain(raw: AssignmentSubmissionEntity): AssignmentSubmission {
    const domainEntity = new AssignmentSubmission();
    domainEntity.id = raw.id;
    domainEntity.status = raw.status;
    if (raw.student) {
      domainEntity.student = UserMapper.toDomain(raw.student);
    }
    if (raw.file) {
      domainEntity.file = FileMapper.toDomain(raw.file);
    }
    if (raw.assignment) {
      domainEntity.assignment = AssignmentsMapper.toDomain(raw.assignment);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: AssignmentSubmission,
  ): AssignmentSubmissionEntity {
    let student: UserEntity | undefined = undefined;

    if (domainEntity.student) {
      student = new UserEntity();
      student.id = domainEntity.student.id;
    }

    let assignment: AssignmentsEntity | undefined = undefined;

    if (domainEntity.assignment) {
      assignment = new AssignmentsEntity();
      assignment.id = domainEntity.assignment.id;
    }

    let file: FileEntity | undefined | null = undefined;

    if (domainEntity.file) {
      file = new FileEntity();
      file.id = domainEntity.file.id;
      file.path = domainEntity.file.path;
    } else {
      file = null;
    }

    const persistenceEntity = new AssignmentSubmissionEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.status = domainEntity.status;
    persistenceEntity.student = student;
    persistenceEntity.file = file;
    persistenceEntity.assignment = assignment;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
