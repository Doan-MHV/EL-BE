import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { MaterialType } from '../../domain/material-type';

export abstract class MaterialTypeRepository {
  abstract create(
    data: Omit<MaterialType, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<MaterialType>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<MaterialType[]>;

  abstract findById(
    id: MaterialType['id'],
  ): Promise<NullableType<MaterialType>>;

  abstract findByIds(ids: MaterialType['id'][]): Promise<MaterialType[]>;

  abstract update(
    id: MaterialType['id'],
    payload: DeepPartial<MaterialType>,
  ): Promise<MaterialType | null>;

  abstract remove(id: MaterialType['id']): Promise<void>;
}
