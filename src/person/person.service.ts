import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "./entities/person.entity";
import { Repository } from "typeorm";

@Injectable()
export class PersonService {
  constructor(@InjectRepository(Person) private personRepository: Repository<Person>) {
  }


  async create(createPersonDto: CreatePersonDto) {
    const persons = this.personRepository.create(createPersonDto);

    return await this.personRepository.save(persons);
  }

  async findAll() {
    return await this.personRepository.find();
  }

  async findOne(id: number) {
    const foundPerson = await this.personRepository.findOneBy({id});
    if (!foundPerson) {
      throw new HttpException("Person is not found", HttpStatus.NOT_FOUND);
    }
    return foundPerson;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const foundPerson = await this.personRepository.findOneBy({id});
    if (!foundPerson) {
      throw new HttpException("Person is not found", HttpStatus.NOT_FOUND);
    }
    this.personRepository.merge(foundPerson, updatePersonDto);
    return await this.personRepository.save(foundPerson);
  }

  async remove(id: number) {
    const foundPerson = await this.personRepository.findOneBy({id});
    if (!foundPerson) {
      throw new HttpException("Person is not found", HttpStatus.NOT_FOUND);
    }
    await this.personRepository.remove(foundPerson);
    return true;
  }
}
