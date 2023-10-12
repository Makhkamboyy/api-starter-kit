import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({summary: "Create a user"})
  @ApiResponse({status: 200, type: User})
  @Post()
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: "Get all users"})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Get one user"})
  @ApiResponse({status: 200, type: User})
  @Get(':id')
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Update one user"})
  @ApiResponse({status: 200, type: User})
  @Patch(':id')
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Delete one user"})
  @ApiResponse({status: 200, type: User})
  @Delete(':id')
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
