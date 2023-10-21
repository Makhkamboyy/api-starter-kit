import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../role/entities/role.entity";
import { Person } from "../../person/entities/person.entity";

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "personId"})
  personId: number;

  @Column({type: 'varchar', nullable: false, unique: true})
  email: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @Column({ type: 'boolean', default: false })
  isBanned: boolean;

  @Column({ type: 'varchar', nullable: true })
  banReason: string;

  @Column({ type: 'boolean', default: false })
  isDelete: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @ManyToOne(() => Person, person => person.users, {
    onDelete: 'CASCADE'
  })
  person: Person;
}
