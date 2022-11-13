import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {ProductRepository} from './product.repository'
import {prepareData} from '../../helpers/data'
import {Product} from './product.entity'
import {OrderItemDto} from '../order/order.validation'
import {OrderItem} from '../orderItem/orderItem.entity'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository) private readonly productRepository: ProductRepository,
  ) {}

  async getList(offset: number, limit: number) {
    const data = await this.productRepository.getListForUser(offset, limit)
    return data.map((el) => prepareData(el))
  }

  async getListForUser(offset: number, limit: number) {
    const data = await this.productRepository.getList(offset, limit)
    return data.map((el) => prepareData(el))
  }

  async getOrderProducts(products: OrderItemDto): Promise<OrderItem[]> {
    return await Promise.all(products.map(async (el) => {
      const orderItem = new OrderItem()
      orderItem.product = await this.productRepository.findOneBy({id: el.productId})
      orderItem.quantity = el.quantity
      return orderItem
    }))
  }

  async getSavedProduct(product: Product) {
    const response = await this.productRepository.getOneWithType(product.id)
    return prepareData(response)
  }
}
