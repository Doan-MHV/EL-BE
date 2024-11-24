// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateAssignmentMaterialsDto } from './create-assignment-materials.dto';

export class UpdateAssignmentMaterialsDto extends PartialType(
  CreateAssignmentMaterialsDto,
) {}
