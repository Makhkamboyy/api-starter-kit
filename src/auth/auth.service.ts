import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);

    return await this.generateToken(user);
  }


  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return await this.generateToken(user);
  }

  async getAboutMe(req: User) {
    const user = this.usersService.findOneByEmail(req.email);
    if(!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }



  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOneByEmail(loginUserDto.email);
    if(!user) {
      throw new UnauthorizedException({ message: "Email or password is incorrect" });
    }
    const passwordEquals = await bcrypt.compare(loginUserDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: "Email or password is incorrect" });
  }


  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, roles: user.roles };

    return {
      token: this.jwtService.sign(payload)
    };
  }


}
