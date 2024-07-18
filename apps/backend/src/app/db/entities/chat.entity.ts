import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import { User } from './user.entity';

export enum ChatType { Private, Group };

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  type: ChatType;

  @Column({ type: 'text', nullable: true })
  name?: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}