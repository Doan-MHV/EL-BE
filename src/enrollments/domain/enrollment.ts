import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/domain/course';
import { User } from '../../users/domain/user';

export class Enrollment {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: () => Course,
  })
  course?: Course | null;

  @ApiProperty({ type: () => User })
  student?: User | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
