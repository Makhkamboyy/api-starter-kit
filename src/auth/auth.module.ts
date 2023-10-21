import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PersonModule } from "../person/person.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    PersonModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || '54321abc',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
