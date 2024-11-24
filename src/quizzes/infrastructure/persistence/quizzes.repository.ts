import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Quizzes } from '../../domain/quizzes';

export abstract class QuizzesRepository {
  abstract create(
    data: Omit<Quizzes, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Quizzes>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Quizzes[]>;

  abstract findById(id: Quizzes['id']): Promise<NullableType<Quizzes>>;

  abstract findByIds(ids: Quizzes['id'][]): Promise<Quizzes[]>;

  abstract update(
    id: Quizzes['id'],
    payload: DeepPartial<Quizzes>,
  ): Promise<Quizzes | null>;

  abstract remove(id: Quizzes['id']): Promise<void>;
}