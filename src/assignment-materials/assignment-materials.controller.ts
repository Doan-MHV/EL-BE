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
import { AssignmentMaterialsService } from './assignment-materials.service';
import { CreateAssignmentMaterialsDto } from './dto/create-assignment-materials.dto';
import { UpdateAssignmentMaterialsDto } from './dto/update-assignment-materials.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AssignmentMaterials } from './domain/assignment-materials';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAssignmentMaterialsDto } from './dto/find-all-assignment-materials.dto';

@ApiTags('Assignmentmaterials')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'assignment-materials',
  version: '1',
})
export class AssignmentMaterialsController {
  constructor(
    private readonly assignmentMaterialsService: AssignmentMaterialsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: AssignmentMaterials,
  })
  create(@Body() createAssignmentMaterialsDto: CreateAssignmentMaterialsDto) {
    return this.assignmentMaterialsService.create(createAssignmentMaterialsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(AssignmentMaterials),
  })
  async findAll(
    @Query() query: FindAllAssignmentMaterialsDto,
  ): Promise<InfinityPaginationResponseDto<AssignmentMaterials>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.assignmentMaterialsService.findAllWithPagination({
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
    type: AssignmentMaterials,
  })
  findById(@Param('id') id: string) {
    return this.assignmentMaterialsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AssignmentMaterials,
  })
  update(
    @Param('id') id: string,
    @Body() updateAssignmentMaterialsDto: UpdateAssignmentMaterialsDto,
  ) {
    return this.assignmentMaterialsService.update(
      id,
      updateAssignmentMaterialsDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.assignmentMaterialsService.remove(id);
  }
}
