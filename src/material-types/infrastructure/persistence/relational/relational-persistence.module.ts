import { Module } from '@nestjs/common';
import { MaterialTypeRepository } from '../material-type.repository';
import { MaterialTypeRelationalRepository } from './repositories/material-type.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialTypeEntity } from './entities/material-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialTypeEntity])],
  providers: [
    {
      provide: MaterialTypeRepository,
      useClass: MaterialTypeRelationalRepository,
    },
  ],
  exports: [MaterialTypeRepository],
})
export class RelationalMaterialTypePersistenceModule {}
