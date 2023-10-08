import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";


@Entity({name: 'roles'})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  value: string;

  @Column({type: 'varchar', nullable: false})
  description: string;

  @ManyToMany(() => User)
  @JoinTable({ name: 'user_roles'})
  users: User[];
}
