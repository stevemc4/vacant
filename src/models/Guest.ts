import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm'
import Rent from './Rent'

@Entity()
class Guest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  @Index('guestIdIndex', {
    unique: true
  })
  guestId: string;

  @Column()
  name: string;

  @OneToMany(() => Rent, rent => rent.guest, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
    cascade: true
  })
  rents: Rent[]
}

export default Guest
