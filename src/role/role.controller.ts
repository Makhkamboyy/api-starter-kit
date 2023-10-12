import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "./entities/role.entity";

@ApiTags("Roles")
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}


  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a role" })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all roles" })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.roleService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get one role" })
  @ApiResponse({ status: 200, type: Role })
  @Get(':value')
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('value') value: string) {
    return this.roleService.findOne(value);
  }


  @ApiBearerAuth()
  @ApiOperation({ summary: "Update one role" })
  @ApiResponse({ status: 200, type: Role })
  @Patch(':id')
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete one role" })
  @ApiResponse({ status: 200, type: Role })
  @Delete(':id')
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
