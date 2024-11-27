import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type QuizQuestionSchemaDocument =
  HydratedDocument<QuizQuestionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class QuizQuestionSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  questionText: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  answer: string;

  @Prop({ required: true })
  quizId: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const QuizQuestionSchema = SchemaFactory.createForClass(
  QuizQuestionSchemaClass,
);
