import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { CurrentUser } from "../user/current.user.decorator";
import { User } from "../user/entities/user.entity";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserPersonDto } from "../user/dto/create-user-person.dto";


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: "Create a user login"})
  @ApiResponse({status: 200, type: User})
  @Post("/login")
  login(@Body() LoginUserDto: LoginUserDto) {
      return this.authService.login(LoginUserDto);
  }


  @ApiOperation({summary: "Create a user registration"})
  @ApiResponse({status: 200, type: User})
  @Post("/registration")
  register(@Body() createUserPersonDto: CreateUserPersonDto) {
    return this.authService.register(createUserPersonDto);
  }


  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a about me" })
  @ApiResponse({ status: 200, type: User })
  @Get("/aboutMe")
  @UseGuards(JwtAuthGuard)
  getAboutMe(@CurrentUser() req: User) {
    return this.authService.getAboutMe(req);
  }
}
