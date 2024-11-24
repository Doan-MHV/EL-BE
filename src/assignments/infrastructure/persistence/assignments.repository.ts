import { FilterAssignmentDto } from 'src/assignments/dto/find-all-assignments.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Assignments } from '../../domain/assignments';

export abstract class AssignmentsRepository {
  abstract create(
    data: Omit<Assignments, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Assignments>;

  abstract findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterAssignmentDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Assignments[]>;

  abstract findById(id: Assignments['id']): Promise<NullableType<Assignments>>;

  abstract findByIds(ids: Assignments['id'][]): Promise<Assignments[]>;

  abstract update(
    id: Assignments['id'],
    payload: DeepPartial<Assignments>,
  ): Promise<Assignments | null>;

  abstract remove(id: Assignments['id']): Promise<void>;
}
