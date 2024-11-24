import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuizQuestionSchema,
  QuizQuestionSchemaClass,
} from './entities/quiz-question.schema';
import { QuizQuestionRepository } from '../quiz-question.repository';
import { QuizQuestionDocumentRepository } from './repositories/quiz-question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizQuestionSchemaClass.name, schema: QuizQuestionSchema },
    ]),
  ],
  providers: [
    {
      provide: QuizQuestionRepository,
      useClass: QuizQuestionDocumentRepository,
    },
  ],
  exports: [QuizQuestionRepository],
})
export class DocumentQuizQuestionPersistenceModule {}
