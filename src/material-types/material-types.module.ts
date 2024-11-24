import { Module } from '@nestjs/common';
import { MaterialTypesService } from './material-types.service';
import { MaterialTypesController } from './material-types.controller';
import { RelationalMaterialTypePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalMaterialTypePersistenceModule,
  ],
  controllers: [MaterialTypesController],
  providers: [MaterialTypesService],
  exports: [MaterialTypesService, RelationalMaterialTypePersistenceModule],
})
export class MaterialTypesModule {}
