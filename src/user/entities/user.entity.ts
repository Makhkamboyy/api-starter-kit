import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../role/entities/role.entity";

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  name: string;

  @Column({type: 'varchar', nullable: false})
  sname: string;

  @Column({type: 'varchar', nullable: false})
  phone: string;

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
}
