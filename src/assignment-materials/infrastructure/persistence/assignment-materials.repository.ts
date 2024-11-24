import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { AssignmentMaterials } from '../../domain/assignment-materials';
import { FilterAssignmentMaterialsDto } from '../../dto/find-all-assignment-materials.dto';

export abstract class AssignmentMaterialsRepository {
  abstract create(
    data: Omit<
      AssignmentMaterials,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Promise<AssignmentMaterials>;

  abstract findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterAssignmentMaterialsDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<AssignmentMaterials[]>;

  abstract findById(
    id: AssignmentMaterials['id'],
  ): Promise<NullableType<AssignmentMaterials>>;

  abstract findByIds(
    ids: AssignmentMaterials['id'][],
  ): Promise<AssignmentMaterials[]>;

  abstract update(
    id: AssignmentMaterials['id'],
    payload: DeepPartial<AssignmentMaterials>,
  ): Promise<AssignmentMaterials | null>;

  abstract remove(id: AssignmentMaterials['id']): Promise<void>;
}
