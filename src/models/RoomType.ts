import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm'

@Entity()
class RoomType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true
  })
  name: string

  @Column({
    type: 'bigint'
  })
  rate: number
}

export default RoomType
