import { QuizQuestion } from '../../../../domain/quiz-question';
import { QuizQuestionSchemaClass } from '../entities/quiz-question.schema';

export class QuizQuestionMapper {
  public static toDomain(raw: QuizQuestionSchemaClass): QuizQuestion {
    const domainEntity = new QuizQuestion();
    domainEntity.id = raw._id.toString();
    domainEntity.questionText = raw.questionText;
    domainEntity.options = raw.options;
    domainEntity.answer = raw.answer;
    domainEntity.quizId = raw.quizId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: QuizQuestion,
  ): QuizQuestionSchemaClass {
    const persistenceSchema = new QuizQuestionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.questionText = domainEntity.questionText;
    persistenceSchema.options = domainEntity.options;
    persistenceSchema.answer = domainEntity.answer;
    persistenceSchema.quizId = domainEntity.quizId;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
