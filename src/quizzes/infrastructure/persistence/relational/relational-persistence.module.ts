import { Module } from '@nestjs/common';
import { QuizzesRepository } from '../quizzes.repository';
import { QuizzesRelationalRepository } from './repositories/quizzes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesEntity } from './entities/quizzes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizzesEntity])],
  providers: [
    {
      provide: QuizzesRepository,
      useClass: QuizzesRelationalRepository,
    },
  ],
  exports: [QuizzesRepository],
})
export class RelationalQuizzesPersistenceModule {}
