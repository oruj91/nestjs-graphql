import {Injectable} from '@nestjs/common'
import {DataSource, Repository} from 'typeorm'
import {Product} from '@libs/common/entity/product.entity'

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager())
  }

  async getList(offset = 0, limit = 10): Promise<Product[]> {
    return this.find({
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
    })
  }

  async getPublishedList(offset = 0, limit = 10): Promise<Product[]> {
    return await this.createQueryBuilder('product')
      .where('product.is_published = true')
      .orderBy('product.id', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany()
  }

  async getOneOrFail(id: number) {
    return this.findOneOrFail({
      where: {id},
    })
  }

  async deleteOrFail(id: number) {
    await this.findOneOrFail({
      where: {id},
    })
    return this.delete(id)
  }
}
