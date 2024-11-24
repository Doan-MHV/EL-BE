import { Module } from '@nestjs/common';
import { AssignmentMaterialsRepository } from '../assignment-materials.repository';
import { AssignmentMaterialsRelationalRepository } from './repositories/assignment-materials.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentMaterialsEntity } from './entities/assignment-materials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentMaterialsEntity])],
  providers: [
    {
      provide: AssignmentMaterialsRepository,
      useClass: AssignmentMaterialsRelationalRepository,
    },
  ],
  exports: [AssignmentMaterialsRepository],
})
export class RelationalAssignmentMaterialsPersistenceModule {}
