import { Module } from '@nestjs/common';
import { EnrollsService } from './enrolls.service';
import { EnrollsController } from './enrolls.controller';
import { RelationalEnrollPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalEnrollPersistenceModule,
  ],
  controllers: [EnrollsController],
  providers: [EnrollsService],
  exports: [EnrollsService, RelationalEnrollPersistenceModule],
})
export class EnrollsModule {}
