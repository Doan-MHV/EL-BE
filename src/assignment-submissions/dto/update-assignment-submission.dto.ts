// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateAssignmentSubmissionDto } from './create-assignment-submission.dto';

export class UpdateAssignmentSubmissionDto extends PartialType(
  CreateAssignmentSubmissionDto,
) {}
