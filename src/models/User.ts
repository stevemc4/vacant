import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user'
}

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    length: 64,
    select: false
  })
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @Column({
    default: true
  })
  enabled: boolean;
}

export default User
export { UserRole }
