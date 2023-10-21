import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../user/entities/user.entity";
import { Person } from "./entities/person.entity";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags('Persons')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @ApiBearerAuth()
  @ApiOperation({summary: "Create a person"})
  @ApiResponse({status: 200, type: Person})
  @Post()
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Get all persons"})
  @ApiResponse({status: 200, type: [Person]})
  @Get()
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.personService.findAll();
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Get one person"})
  @ApiResponse({status: 200, type: Person})
  @Get(':id')
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.personService.findOne(id);
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Update one person"})
  @ApiResponse({status: 200, type: Person})
  @Patch(':id')
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Delete one person"})
  @ApiResponse({status: 200, type: Person})
  @Delete(':id')
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}
