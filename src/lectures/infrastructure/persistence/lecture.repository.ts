import { FilterLectureDto } from 'src/lectures/dto/find-all-lectures.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Lecture } from '../../domain/lecture';

export abstract class LectureRepository {
  abstract create(
    data: Omit<Lecture, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Lecture>;

  abstract findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterLectureDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Lecture[]>;

  abstract findById(id: Lecture['id']): Promise<NullableType<Lecture>>;

  abstract findByIds(ids: Lecture['id'][]): Promise<Lecture[]>;

  abstract update(
    id: Lecture['id'],
    payload: DeepPartial<Lecture>,
  ): Promise<Lecture | null>;

  abstract remove(id: Lecture['id']): Promise<void>;
}
