import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;
}
