import { Module } from '@nestjs/common';
import { AssignmentSubmissionRepository } from '../assignment-submission.repository';
import { AssignmentSubmissionRelationalRepository } from './repositories/assignment-submission.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentSubmissionEntity } from './entities/assignment-submission.entity';
import { GradeEntity } from '../../../../grades/infrastructure/persistence/relational/entities/grade.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssignmentSubmissionEntity, GradeEntity]),
  ],
  providers: [
    {
      provide: AssignmentSubmissionRepository,
      useClass: AssignmentSubmissionRelationalRepository,
    },
  ],
  exports: [AssignmentSubmissionRepository],
})
export class RelationalAssignmentSubmissionPersistenceModule {}
