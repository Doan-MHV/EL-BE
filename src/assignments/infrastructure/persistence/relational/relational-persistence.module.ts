import { Module } from '@nestjs/common';
import { AssignmentsRepository } from '../assignments.repository';
import { AssignmentsRelationalRepository } from './repositories/assignments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsEntity } from './entities/assignments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentsEntity])],
  providers: [
    {
      provide: AssignmentsRepository,
      useClass: AssignmentsRelationalRepository,
    },
  ],
  exports: [AssignmentsRepository],
})
export class RelationalAssignmentsPersistenceModule {}
