import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  VIEWER = 'viewer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'text',
    default: UserRole.VIEWER,
  })
  role: UserRole;
}
