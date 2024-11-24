import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { RelationalAssignmentsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalAssignmentsPersistenceModule,
    CoursesModule,
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService, RelationalAssignmentsPersistenceModule],
})
export class AssignmentsModule {}
