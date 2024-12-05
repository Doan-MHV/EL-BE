import { Module } from '@nestjs/common';
import { QuizzesRepository } from '../quizzes.repository';
import { QuizzesRelationalRepository } from './repositories/quizzes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesEntity } from './entities/quizzes.entity';
import { GradeEntity } from '../../../../grades/infrastructure/persistence/relational/entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizzesEntity, GradeEntity])],
  providers: [
    {
      provide: QuizzesRepository,
      useClass: QuizzesRelationalRepository,
    },
  ],
  exports: [QuizzesRepository],
})
export class RelationalQuizzesPersistenceModule {}
