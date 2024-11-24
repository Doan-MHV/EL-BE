import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Enroll } from '../../domain/enroll';

export abstract class EnrollRepository {
  abstract create(
    data: Omit<Enroll, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Enroll>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Enroll[]>;

  abstract findById(id: Enroll['id']): Promise<NullableType<Enroll>>;

  abstract findByIds(ids: Enroll['id'][]): Promise<Enroll[]>;

  abstract update(
    id: Enroll['id'],
    payload: DeepPartial<Enroll>,
  ): Promise<Enroll | null>;

  abstract remove(id: Enroll['id']): Promise<void>;
}
