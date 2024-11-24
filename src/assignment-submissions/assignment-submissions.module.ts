import { Module } from '@nestjs/common';
import { AssignmentSubmissionsService } from './assignment-submissions.service';
import { AssignmentSubmissionsController } from './assignment-submissions.controller';
import { RelationalAssignmentSubmissionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AssignmentsModule } from '../assignments/assignments.module';
import { FilesModule } from '../files/files.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalAssignmentSubmissionPersistenceModule,
    AssignmentsModule,
    FilesModule,
    UsersModule,
  ],
  controllers: [AssignmentSubmissionsController],
  providers: [AssignmentSubmissionsService],
  exports: [
    AssignmentSubmissionsService,
    RelationalAssignmentSubmissionPersistenceModule,
  ],
})
export class AssignmentSubmissionsModule {}
