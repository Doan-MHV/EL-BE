import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { AssignmentSubmission } from '../../domain/assignment-submission';
import { FilterAssignmentMaterialsDto } from '../../../assignment-materials/dto/find-all-assignment-materials.dto';

export abstract class AssignmentSubmissionRepository {
  abstract create(
    data: Omit<AssignmentSubmission, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AssignmentSubmission>;

  abstract findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterAssignmentMaterialsDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<AssignmentSubmission[]>;

  abstract findById(
    id: AssignmentSubmission['id'],
  ): Promise<NullableType<AssignmentSubmission>>;

  abstract findByIds(
    ids: AssignmentSubmission['id'][],
  ): Promise<AssignmentSubmission[]>;

  abstract update(
    id: AssignmentSubmission['id'],
    payload: DeepPartial<AssignmentSubmission>,
  ): Promise<AssignmentSubmission | null>;

  abstract remove(id: AssignmentSubmission['id']): Promise<void>;
}
