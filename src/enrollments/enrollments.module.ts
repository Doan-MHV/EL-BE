import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { RelationalEnrollmentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalEnrollmentPersistenceModule,
    CoursesModule,
    UsersModule,
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  exports: [EnrollmentsService, RelationalEnrollmentPersistenceModule],
})
export class EnrollmentsModule {}
