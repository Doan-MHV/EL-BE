import { Module } from '@nestjs/common';
import { AssignmentsRepository } from '../assignments.repository';
import { AssignmentsRelationalRepository } from './repositories/assignments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsEntity } from './entities/assignments.entity';
import { AssignmentSubmissionEntity } from '../../../../assignment-submissions/infrastructure/persistence/relational/entities/assignment-submission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssignmentsEntity, AssignmentSubmissionEntity]),
  ],
  providers: [
    {
      provide: AssignmentsRepository,
      useClass: AssignmentsRelationalRepository,
    },
  ],
  exports: [AssignmentsRepository],
})
export class RelationalAssignmentsPersistenceModule {}
