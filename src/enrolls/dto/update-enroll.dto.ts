// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateEnrollDto } from './create-enroll.dto';

export class UpdateEnrollDto extends PartialType(CreateEnrollDto) {}
