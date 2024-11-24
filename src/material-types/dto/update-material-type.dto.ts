// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateMaterialTypeDto } from './create-material-type.dto';

export class UpdateMaterialTypeDto extends PartialType(CreateMaterialTypeDto) {}
