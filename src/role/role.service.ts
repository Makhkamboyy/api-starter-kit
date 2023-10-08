import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {

  constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>) {
  }
  async create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(role);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(value: string) {
    const role = await this.rolesRepository.findOneBy({value});
    if(!role) {
      throw new HttpException("Role is not found", HttpStatus.NOT_FOUND);
    }
    return await this.rolesRepository.findOneBy({value});
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOneBy({id});
    if(!role) {
      throw new HttpException("Role is not found", HttpStatus.NOT_FOUND);
    }
    this.rolesRepository.merge(role, updateRoleDto);
    return this.rolesRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.rolesRepository.findOneBy({id});
    if(!role) {
      throw new HttpException("Role is not found", HttpStatus.NOT_FOUND);
    }
    await this.rolesRepository.remove(role);
    return true;
  }
}
