import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';
import { RelationalLecturePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalLecturePersistenceModule,
    CoursesModule,
  ],
  controllers: [LecturesController],
  providers: [LecturesService],
  exports: [LecturesService, RelationalLecturePersistenceModule],
})
export class LecturesModule {}
