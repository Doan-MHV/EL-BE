import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';
import { AssignmentMaterials } from '../../../../domain/assignment-materials';
import { AssignmentMaterialsEntity } from '../entities/assignment-materials.entity';
import { AssignmentsMapper } from 'src/assignments/infrastructure/persistence/relational/mappers/assignments.mapper';
import { AssignmentsEntity } from 'src/assignments/infrastructure/persistence/relational/entities/assignments.entity';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';

export class AssignmentMaterialsMapper {
  static toDomain(raw: AssignmentMaterialsEntity): AssignmentMaterials {
    const domainEntity = new AssignmentMaterials();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
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
    domainEntity: AssignmentMaterials,
  ): AssignmentMaterialsEntity {
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

    const persistenceEntity = new AssignmentMaterialsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.file = file;
    persistenceEntity.assignment = assignment;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
