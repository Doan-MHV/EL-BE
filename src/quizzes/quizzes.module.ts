import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { RelationalQuizzesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalQuizzesPersistenceModule,
    CoursesModule,
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService, RelationalQuizzesPersistenceModule],
})
export class QuizzesModule {}
