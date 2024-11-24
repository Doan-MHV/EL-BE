import { Enroll } from '../../../../domain/enroll';
import { EnrollEntity } from '../entities/enroll.entity';

export class EnrollMapper {
  static toDomain(raw: EnrollEntity): Enroll {
    const domainEntity = new Enroll();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Enroll): EnrollEntity {
    const persistenceEntity = new EnrollEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
