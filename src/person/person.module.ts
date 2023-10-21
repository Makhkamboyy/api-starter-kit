import { forwardRef, Module } from "@nestjs/common";
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { AuthModule } from "../auth/auth.module";
import { Person } from "./entities/person.entity";

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  imports: [
    TypeOrmModule.forFeature([User, Person]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    PersonService
  ]
})
export class PersonModule {}
