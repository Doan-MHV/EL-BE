import { Module } from '@nestjs/common';
import { AssignmentMaterialsService } from './assignment-materials.service';
import { AssignmentMaterialsController } from './assignment-materials.controller';
import { RelationalAssignmentMaterialsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from 'src/files/files.module';
import { AssignmentsModule } from 'src/assignments/assignments.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalAssignmentMaterialsPersistenceModule,
    AssignmentsModule,
    FilesModule,
  ],
  controllers: [AssignmentMaterialsController],
  providers: [AssignmentMaterialsService],
  exports: [
    AssignmentMaterialsService,
    RelationalAssignmentMaterialsPersistenceModule,
  ],
})
export class AssignmentMaterialsModule {}
