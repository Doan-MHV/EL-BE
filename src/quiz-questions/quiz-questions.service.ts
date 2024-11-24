import { Injectable } from '@nestjs/common';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { QuizQuestionRepository } from './infrastructure/persistence/quiz-question.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { QuizQuestion } from './domain/quiz-question';

@Injectable()
export class QuizQuestionsService {
  constructor(
    // Dependencies here
    private readonly quizQuestionRepository: QuizQuestionRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createQuizQuestionDto: CreateQuizQuestionDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.quizQuestionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.quizQuestionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: QuizQuestion['id']) {
    return this.quizQuestionRepository.findById(id);
  }

  findByIds(ids: QuizQuestion['id'][]) {
    return this.quizQuestionRepository.findByIds(ids);
  }

  async update(
    id: QuizQuestion['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateQuizQuestionDto: UpdateQuizQuestionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.quizQuestionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: QuizQuestion['id']) {
    return this.quizQuestionRepository.remove(id);
  }
}
