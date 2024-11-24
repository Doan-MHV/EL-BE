// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateAssignmentsDto } from './create-assignments.dto';

export class UpdateAssignmentsDto extends PartialType(CreateAssignmentsDto) {}
