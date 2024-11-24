import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAssignmentMaterialsDto } from './dto/create-assignment-materials.dto';
import { UpdateAssignmentMaterialsDto } from './dto/update-assignment-materials.dto';
import { AssignmentMaterialsRepository } from './infrastructure/persistence/assignment-materials.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AssignmentMaterials } from './domain/assignment-materials';
import { FilesService } from 'src/files/files.service';
import { FileType } from 'src/files/domain/file';
import { Assignments } from 'src/assignments/domain/assignments';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { FilterAssignmentMaterialsDto } from './dto/find-all-assignment-materials.dto';

@Injectable()
export class AssignmentMaterialsService {
  constructor(
    // Dependencies here
    private readonly assignmentMaterialsRepository: AssignmentMaterialsRepository,
    private readonly filesService: FilesService,
    private readonly assignmentsService: AssignmentsService,
  ) {}

  async create(createAssignmentMaterialsDto: CreateAssignmentMaterialsDto) {
    // Do not remove comment below.
    // <creating-property />

    let file: FileType | null | undefined = undefined;

    if (createAssignmentMaterialsDto.file) {
      const fileObject = await this.filesService.findById(
        createAssignmentMaterialsDto.file.id,
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
    } else if (createAssignmentMaterialsDto.file === null) {
      file = null;
    }

    let assignment: Assignments | null | undefined = undefined;

    if (createAssignmentMaterialsDto.assignment?.id) {
      const id: Assignments['id'] = createAssignmentMaterialsDto.assignment?.id;
      assignment = await this.assignmentsService.findById(id);
    } else if (createAssignmentMaterialsDto.assignment === null) {
      assignment = null;
    }

    return this.assignmentMaterialsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createAssignmentMaterialsDto.name,
      description: createAssignmentMaterialsDto.description,
      assignment: assignment,
      file: file,
    });
  }

  findAllWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterAssignmentMaterialsDto | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.assignmentMaterialsRepository.findAllWithPagination({
      filterOptions,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: AssignmentMaterials['id']) {
    return this.assignmentMaterialsRepository.findById(id);
  }

  findByIds(ids: AssignmentMaterials['id'][]) {
    return this.assignmentMaterialsRepository.findByIds(ids);
  }

  async update(
    id: AssignmentMaterials['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAssignmentMaterialsDto: UpdateAssignmentMaterialsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.assignmentMaterialsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: AssignmentMaterials['id']) {
    return this.assignmentMaterialsRepository.remove(id);
  }
}
