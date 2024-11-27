import { Module } from '@nestjs/common';
import { CourseRepository } from '../course.repository';
import { CourseRelationalRepository } from './repositories/course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { EnrollmentEntity } from '../../../../enrollments/infrastructure/persistence/relational/entities/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, EnrollmentEntity])],
  providers: [
    {
      provide: CourseRepository,
      useClass: CourseRelationalRepository,
    },
  ],
  exports: [CourseRepository],
})
export class RelationalCoursePersistenceModule {}
