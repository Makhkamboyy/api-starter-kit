import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity({name: "persons"})
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  name: string;

  @Column({type: 'varchar', nullable: false})
  sname: string;

  @Column({type: 'varchar', nullable: false})
  phone: string;

  @OneToMany(() => User, user => user.person)
  users: User[];
}
