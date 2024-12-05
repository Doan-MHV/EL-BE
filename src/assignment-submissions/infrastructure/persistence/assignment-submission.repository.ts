import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { AssignmentSubmission } from '../../domain/assignment-submission';
import { FilterAssignmentSubmissionsDto } from '../../dto/find-all-assignment-submissions.dto';

export abstract class AssignmentSubmissionRepository {
  abstract create(
    data: Omit<AssignmentSubmission, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AssignmentSubmission>;

  abstract findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterAssignmentSubmissionsDto | null;
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
