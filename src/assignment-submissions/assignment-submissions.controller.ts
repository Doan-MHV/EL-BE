import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssignmentSubmissionsService } from './assignment-submissions.service';
import { CreateAssignmentSubmissionDto } from './dto/create-assignment-submission.dto';
import { UpdateAssignmentSubmissionDto } from './dto/update-assignment-submission.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AssignmentSubmission } from './domain/assignment-submission';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAssignmentSubmissionsDto } from './dto/find-all-assignment-submissions.dto';

@ApiTags('Assignmentsubmissions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'assignment-submissions',
  version: '1',
})
export class AssignmentSubmissionsController {
  constructor(
    private readonly assignmentSubmissionsService: AssignmentSubmissionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: AssignmentSubmission,
  })
  create(@Body() createAssignmentSubmissionDto: CreateAssignmentSubmissionDto) {
    return this.assignmentSubmissionsService.create(
      createAssignmentSubmissionDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(AssignmentSubmission),
  })
  async findAll(
    @Query() query: FindAllAssignmentSubmissionsDto,
  ): Promise<InfinityPaginationResponseDto<AssignmentSubmission>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.assignmentSubmissionsService.findAllWithPagination({
        filterOptions: query?.filters,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AssignmentSubmission,
  })
  findById(@Param('id') id: string) {
    return this.assignmentSubmissionsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AssignmentSubmission,
  })
  update(
    @Param('id') id: string,
    @Body() updateAssignmentSubmissionDto: UpdateAssignmentSubmissionDto,
  ) {
    return this.assignmentSubmissionsService.update(
      id,
      updateAssignmentSubmissionDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.assignmentSubmissionsService.remove(id);
  }
}
