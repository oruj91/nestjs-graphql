import {
  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({length: 15})
  firstName: string

  @Column({length: 15})
  lastName: string

  @Column()
  email: string

  @Column({length: 60})
  password: string

  @Column({length: 255, nullable: true})
  token: string

  @Column({nullable: true})
  tokenExpire: Date

  @Column({default: false})
  isEmailConfirmed: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn({nullable: true})
  updatedAt: Date

  @DeleteDateColumn({nullable: true})
  deletedAt: Date
}