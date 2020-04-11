import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from 'typeorm'
import Rent from './Rent'

@Entity()
class Guest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  @Index({
    unique: true
  })
  guestId: string;

  @Column()
  name: string;

  @ManyToOne(() => Rent, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  rents: Rent
}

export default Guest
