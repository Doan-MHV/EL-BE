import { Module } from '@nestjs/common';
import { GradeRepository } from '../grade.repository';
import { GradeRelationalRepository } from './repositories/grade.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity])],
  providers: [
    {
      provide: GradeRepository,
      useClass: GradeRelationalRepository,
    },
  ],
  exports: [GradeRepository],
})
export class RelationalGradePersistenceModule {}
