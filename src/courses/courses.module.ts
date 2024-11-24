import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { RelationalCoursePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalCoursePersistenceModule,
    UsersModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService, RelationalCoursePersistenceModule],
})
export class CoursesModule {}
