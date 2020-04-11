import { BaseEntity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, Column, Entity } from 'typeorm'
import Room from './Room'

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

  @Column()
  checkOut: Date;
}

export default Rent
