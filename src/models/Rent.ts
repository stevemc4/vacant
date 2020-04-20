import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, Entity, ManyToOne } from 'typeorm'
import Room from './Room'
import Guest from './Guest'

@Entity()
class Rent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
    nullable: false
  })
  room: Room

  @CreateDateColumn()
  checkIn: Date;

  @Column()
  days: number;

  @Column({
    nullable: true
  })
  checkOut: Date;

  @ManyToOne(() => Guest, guest => guest.rents, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
    cascade: ['insert', 'recover', 'update']
  })
  guest: Guest
}

export default Rent
