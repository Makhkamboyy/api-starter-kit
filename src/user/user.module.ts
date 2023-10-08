import { forwardRef, Module } from "@nestjs/common";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { RoleModule } from "../role/role.module";
import { Role } from "../role/entities/role.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RoleModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
