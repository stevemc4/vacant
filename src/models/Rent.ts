import { BaseEntity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, Column, Entity, ManyToOne } from 'typeorm'
import Room from './Room'
import Guest from './Guest'

@Entity()
class Rent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Room)
  room: Room

  @CreateDateColumn()
  checkIn: Date;

  @Column()
  days: number;

  @Column({
    nullable: true
  })
  checkOut: Date;

  @ManyToOne(() => Guest, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  guest: Guest
}

export default Rent
