import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, Index } from 'typeorm'

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
}
