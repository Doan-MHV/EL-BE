import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { RelationalGradePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';
import { AssignmentsModule } from '../assignments/assignments.module';
import { QuizzesModule } from '../quizzes/quizzes.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalGradePersistenceModule,
    CoursesModule,
    UsersModule,
    AssignmentsModule,
    QuizzesModule,
    MailModule,
  ],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService, RelationalGradePersistenceModule],
})
export class GradesModule {}
