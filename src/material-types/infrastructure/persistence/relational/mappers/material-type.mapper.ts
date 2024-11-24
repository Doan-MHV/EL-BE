import { MaterialType } from '../../../../domain/material-type';
import { MaterialTypeEntity } from '../entities/material-type.entity';

export class MaterialTypeMapper {
  static toDomain(raw: MaterialTypeEntity): MaterialType {
    const domainEntity = new MaterialType();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: MaterialType): MaterialTypeEntity {
    const persistenceEntity = new MaterialTypeEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
