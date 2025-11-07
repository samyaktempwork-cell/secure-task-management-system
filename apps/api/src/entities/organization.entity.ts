import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // optional parent -> child hierarchy
  @ManyToOne(() => Organization, (org) => org.children, { nullable: true, onDelete: 'CASCADE' })
  parentOrg: Organization;

  @OneToMany(() => Organization, (org) => org.parentOrg)
  children: Organization[];

  @OneToMany(() => User, (user) => user.organization)
  users: User[];
}
