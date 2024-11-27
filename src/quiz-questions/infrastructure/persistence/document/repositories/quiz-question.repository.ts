import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { QuizQuestionSchemaClass } from '../entities/quiz-question.schema';
import { QuizQuestionRepository } from '../../quiz-question.repository';
import { QuizQuestion } from '../../../../domain/quiz-question';
import { QuizQuestionMapper } from '../mappers/quiz-question.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FilterQuizQuestionsDto } from '../../../../dto/find-all-quiz-questions.dto';

@Injectable()
export class QuizQuestionDocumentRepository implements QuizQuestionRepository {
  constructor(
    @InjectModel(QuizQuestionSchemaClass.name)
    private readonly quizQuestionModel: Model<QuizQuestionSchemaClass>,
  ) {}

  async create(data: QuizQuestion): Promise<QuizQuestion> {
    const persistenceModel = QuizQuestionMapper.toPersistence(data);
    const createdEntity = new this.quizQuestionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return QuizQuestionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterQuizQuestionsDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<QuizQuestion[]> {
    const where: FilterQuery<QuizQuestionSchemaClass> = {};
    if (filterOptions?.quizzes?.length) {
      where['quizId'] = {
        $in: filterOptions.quizzes.map((quizId) => quizId.toString()),
      };
    }

    const entityObjects = await this.quizQuestionModel
      .find(where)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      QuizQuestionMapper.toDomain(entityObject),
    );
  }

  async findById(id: QuizQuestion['id']): Promise<NullableType<QuizQuestion>> {
    const entityObject = await this.quizQuestionModel.findById(id);
    return entityObject ? QuizQuestionMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: QuizQuestion['id'][]): Promise<QuizQuestion[]> {
    const entityObjects = await this.quizQuestionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      QuizQuestionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: QuizQuestion['id'],
    payload: Partial<QuizQuestion>,
  ): Promise<NullableType<QuizQuestion>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.quizQuestionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.quizQuestionModel.findOneAndUpdate(
      filter,
      QuizQuestionMapper.toPersistence({
        ...QuizQuestionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? QuizQuestionMapper.toDomain(entityObject) : null;
  }

  async remove(id: QuizQuestion['id']): Promise<void> {
    await this.quizQuestionModel.deleteOne({ _id: id });
  }
}
