import { ApiProperty } from '@nestjs/swagger';
import { Assignments } from '../../assignments/domain/assignments';
import { FileType } from '../../files/domain/file';
import { User } from '../../users/domain/user';
import { Grade } from '../../grades/domain/grade';

export class AssignmentSubmission {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  status?: string;

  @ApiProperty({ type: () => User })
  student?: User | null;

  @ApiProperty({
    type: String,
  })
  file?: FileType | null;

  @ApiProperty({
    type: () => Assignments,
  })
  assignment?: Assignments | null;

  @ApiProperty({
    type: Boolean,
  })
  isGraded?: boolean;

  @ApiProperty({
    type: () => Grade,
  })
  grade?: Grade | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
