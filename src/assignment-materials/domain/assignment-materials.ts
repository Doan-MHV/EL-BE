import { ApiProperty } from '@nestjs/swagger';
import { Assignments } from 'src/assignments/domain/assignments';
import { FileType } from 'src/files/domain/file';

export class AssignmentMaterials {
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
  description?: string;

  @ApiProperty({
    type: String,
  })
  file?: FileType | null;

  @ApiProperty({
    type: () => Assignments,
  })
  assignment?: Assignments | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
