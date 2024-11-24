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
import { MaterialTypesService } from './material-types.service';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MaterialType } from './domain/material-type';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllMaterialTypesDto } from './dto/find-all-material-types.dto';

@ApiTags('Materialtypes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'material-types',
  version: '1',
})
export class MaterialTypesController {
  constructor(private readonly materialTypesService: MaterialTypesService) {}

  @Post()
  @ApiCreatedResponse({
    type: MaterialType,
  })
  create(@Body() createMaterialTypeDto: CreateMaterialTypeDto) {
    return this.materialTypesService.create(createMaterialTypeDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(MaterialType),
  })
  async findAll(
    @Query() query: FindAllMaterialTypesDto,
  ): Promise<InfinityPaginationResponseDto<MaterialType>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.materialTypesService.findAllWithPagination({
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
    type: MaterialType,
  })
  findById(@Param('id') id: string) {
    return this.materialTypesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: MaterialType,
  })
  update(
    @Param('id') id: string,
    @Body() updateMaterialTypeDto: UpdateMaterialTypeDto,
  ) {
    return this.materialTypesService.update(id, updateMaterialTypeDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.materialTypesService.remove(id);
  }
}
