import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { CurrentUser } from "../user/current.user.decorator";
import { User } from "../user/entities/user.entity";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/login")
  login(@Body() LoginUserDto: LoginUserDto) {
      return this.authService.login(LoginUserDto);
  }


  @Post("/registration")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }


  @Get("/aboutMe")
  @UseGuards(JwtAuthGuard)
  getAboutMe(@CurrentUser() req: User) {
    return this.authService.getAboutMe(req);
  }
}
