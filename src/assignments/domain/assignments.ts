import { ApiProperty } from '@nestjs/swagger';
import { AssignmentMaterials } from 'src/assignment-materials/domain/assignment-materials';
import { Course } from 'src/courses/domain/course';

export class Assignments {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  description: string;

  @ApiProperty({
    type: Number,
  })
  maxGrade: number;

  @ApiProperty({
    type: Date,
  })
  deadline: Date;

  @ApiProperty({
    type: String,
  })
  status?: string;

  @ApiProperty({
    type: () => Course,
  })
  course?: Course | null;

  @ApiProperty({
    type: () => [AssignmentMaterials],
  })
  assignmentsMaterials?: AssignmentMaterials[];

  @ApiProperty({
    type: Boolean,
  })
  hasSubmitted?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
