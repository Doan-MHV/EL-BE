import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAssignmentSubmissionDto } from './dto/create-assignment-submission.dto';
import { UpdateAssignmentSubmissionDto } from './dto/update-assignment-submission.dto';
import { AssignmentSubmissionRepository } from './infrastructure/persistence/assignment-submission.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AssignmentSubmission } from './domain/assignment-submission';
import { FilesService } from '../files/files.service';
import { AssignmentsService } from '../assignments/assignments.service';
import { UsersService } from '../users/users.service';
import { FileType } from '../files/domain/file';
import { Assignments } from '../assignments/domain/assignments';
import { User } from '../users/domain/user';
import { FilterAssignmentSubmissionsDto } from './dto/find-all-assignment-submissions.dto';

@Injectable()
export class AssignmentSubmissionsService {
  constructor(
    // Dependencies here
    private readonly assignmentSubmissionRepository: AssignmentSubmissionRepository,
    private readonly filesService: FilesService,
    private readonly assignmentsService: AssignmentsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createAssignmentSubmissionDto: CreateAssignmentSubmissionDto) {
    // Do not remove comment below.
    // <creating-property />

    let file: FileType | null | undefined = undefined;

    if (createAssignmentSubmissionDto.file) {
      const fileObject = await this.filesService.findById(
        createAssignmentSubmissionDto.file.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'fileNotExists',
          },
        });
      }
      file = fileObject;
    } else if (createAssignmentSubmissionDto.file === null) {
      file = null;
    }

    let assignment: Assignments | null | undefined = undefined;

    if (createAssignmentSubmissionDto.assignment?.id) {
      const id: Assignments['id'] =
        createAssignmentSubmissionDto.assignment?.id;
      assignment = await this.assignmentsService.findById(id);
    } else if (createAssignmentSubmissionDto.assignment === null) {
      assignment = null;
    }

    let student: User | null | undefined = undefined;

    if (createAssignmentSubmissionDto.student?.id) {
      const id: User['id'] = createAssignmentSubmissionDto.student?.id;
      student = await this.usersService.findById(id);
    } else if (createAssignmentSubmissionDto.student === null) {
      student = null;
    }

    return this.assignmentSubmissionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status: createAssignmentSubmissionDto.status,
      file: file,
      assignment: assignment,
      student: student,
    });
  }

  findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterAssignmentSubmissionsDto | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.assignmentSubmissionRepository.findAllWithPagination({
      filterOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: AssignmentSubmission['id']) {
    return this.assignmentSubmissionRepository.findById(id);
  }

  findByIds(ids: AssignmentSubmission['id'][]) {
    return this.assignmentSubmissionRepository.findByIds(ids);
  }

  async update(
    id: AssignmentSubmission['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAssignmentSubmissionDto: UpdateAssignmentSubmissionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.assignmentSubmissionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: AssignmentSubmission['id']) {
    return this.assignmentSubmissionRepository.remove(id);
  }
}
