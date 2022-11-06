import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId} from 'typeorm'
import {Product} from '../product/product.entity'
import {Order} from '../order/order.entity'

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @RelationId((orderItem: OrderItem) => orderItem.order)
  orderId: number

  @RelationId((orderItem: OrderItem) => orderItem.product)
  productId: number

  @Column()
  quantity: number

  @ManyToOne(() => Order, order => order.orderItems, {
    nullable: false,
  })
  order: Order

  @ManyToOne(() => Product, product => product.id, {
    nullable: false,
  })
  product: Product
}
