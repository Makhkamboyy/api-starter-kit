import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { User } from "./user/entities/user.entity";
import { Role } from "./role/entities/role.entity";
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { Media } from "./media/entities/media.entity";
import * as path from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import { PersonModule } from './person/person.module';
import { Person } from "./person/entities/person.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Role, Media, Person],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../uploads'),
    }),
    UserModule,
    RoleModule,
    AuthModule,
    MediaModule,
    PersonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
