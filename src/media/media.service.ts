import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from "@nestjs/typeorm";
import { Media } from "./entities/media.entity";
import { Repository } from "typeorm";

@Injectable()
export class MediaService {

  constructor(@InjectRepository(Media) private mediaObjectRepository: Repository<Media>) {
  }
  async create(file) {
    try {
      const fileName = uuidv4() + '.jpg';
      const filePath = path.resolve(__dirname, '../../uploads');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      const newMediaObject = this.mediaObjectRepository.create({ image: fileName });
      return this.mediaObjectRepository.save(newMediaObject);
    } catch (e) {
      throw new HttpException('Error happened in uploading images', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async findAll() {
    return await this.mediaObjectRepository.find();
  }

  async findOne(id: number) {
    const mediaObject = await this.mediaObjectRepository.findOneBy({id});

    if (!mediaObject) {
      throw new HttpException('MediaObject not found', HttpStatus.NOT_FOUND);
    }

    return mediaObject;
  }

  async update(id: number, file) {
    try {
      const image = await this.mediaObjectRepository.findOneBy({id});

      if (!image) {
        throw new HttpException('Image is not found', HttpStatus.NOT_FOUND);
      }

      const fileName = uuidv4() + '.jpg';
      const filePath = path.resolve(__dirname, '../../uploads');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const oldFilePath = path.join(filePath, image.image);

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // Delete the old image file
      }



      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      image.image = fileName; // Update the image property in your entity

      const updatedMediaObject = await this.mediaObjectRepository.save(image);

      return updatedMediaObject;
    } catch (e) {
      throw new HttpException('Error happened in updating images', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
