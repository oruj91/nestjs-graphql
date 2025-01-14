import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes} from '@nestjs/common'
import {JwtGuard} from '@libs/common'
import {prepareData} from '@libs/common/helper/function/data'
import {Role, RoleGuard} from '@libs/common/role'
import {ProductTypeOmit} from '@libs/common/types/entityOmit.type'
import {MessageResponse} from '@libs/common/types/response.type'
import {BodyValidatePipe} from '@libs/common/helper/pipe/validation.pipe'
import {
  ProductTypePostDto, productTypePostSchema, ProductTypePutDto, productTypePutSchema,
} from './productType.validation'
import {ProductTypeRepository} from './productType.repository'
import {ProductTypeService} from './productType.service'

@Controller('product/type')
export class ProductTypeController {
  constructor(
    private readonly productTypeRepository: ProductTypeRepository,
    private readonly productTypeService: ProductTypeService,
  ) {}

  @Get()
  async getList(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<ProductTypeOmit[]> {
    return this.productTypeService.getList(offset, limit)
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ProductTypeOmit> {
    const result = await this.productTypeRepository.getOneOrFail(id)
    return prepareData(result)
  }

  @Post()
  @UseGuards(JwtGuard, RoleGuard(Role.Admin))
  @UsePipes(new BodyValidatePipe(productTypePostSchema))
  async create(@Body() data: ProductTypePostDto) {
    const productType = await this.productTypeRepository.save(data)
    return {
      data: prepareData(productType),
      message: 'Product type has been successfully created',
    }
  }

  @Put(':id')
  @UseGuards(JwtGuard, RoleGuard(Role.Admin))
  @UsePipes(new BodyValidatePipe(productTypePutSchema))
  async update(@Param('id') id: number, @Body() data: ProductTypePutDto): Promise<ProductTypeOmit> {
    await this.productTypeRepository.update(id, data)
    return this.getOne(id)
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RoleGuard(Role.Admin))
  async delete(@Param('id') id: number): Promise<MessageResponse> {
    await this.productTypeRepository.deleteOrFail(id)
    return {
      message: `Product type with ${id} has been deleted`,
    }
  }
}
