import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, Index, ManyToOne, JoinTable } from 'typeorm'
import RoomType from './RoomType'

@Entity()
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
    nullable: false
  })
  @Index({
    unique: true
  })
  name: string;

  @Column({
    default: true
  })
  available: boolean;

  @Column({
    default: true
  })
  enabled: boolean;

  @ManyToOne(() => RoomType, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: false,
    eager: true
  })
  @JoinTable()
  type: RoomType
}
