import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { RoleService } from "../role/role.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private rolesService: RoleService) {
  }
  async create(createUserDto: CreateUserDto) {
    const role = await this.rolesService.findOne('ROLE_USER');
    if(!role) {
      throw new HttpException("Role is not found", HttpStatus.NOT_FOUND);
    }

    const isUserExists = await this.findOneByEmail(createUserDto.email);

    if(isUserExists) {
      throw new HttpException("Email is already used", HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const user = this.usersRepository.create({...createUserDto, password: hashPassword});
    user.roles = [role];

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({ relations: ["roles"] });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.usersRepository.findOneBy({id});
    if (!foundUser) {
      throw new HttpException("User is not found", HttpStatus.NOT_FOUND);
    }
    this.usersRepository.merge(foundUser, updateUserDto);
    return await this.usersRepository.save(foundUser);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({id});

    if (!user) {
      throw new HttpException("User is not found", HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.remove(user);

    return true;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({where: {email}, relations: ["roles"]});
  }
}
