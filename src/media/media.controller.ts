import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Media } from "./entities/media.entity";
import { FileUploadDto } from "./dto/file-upload.dto";


@ApiTags("Media")
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}


  @ApiBearerAuth()
  @ApiOperation({summary: "Upload a file"})
  @ApiResponse({status: 200, type: Media})
  @Post()
  @Roles("ROLE_ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of uploads',
    type: FileUploadDto,
  })
  create(@UploadedFile() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Get all uploads"})
  @ApiResponse({status: 200, type: [Media]})
  @Get()
  @Roles("ROLE_ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.mediaService.findAll();
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Get one upload"})
  @ApiResponse({status: 200, type: Media})
  @Get(':id')
  @Roles("ROLE_ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.mediaService.findOne(id);
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Change the upload"})
  @ApiResponse({status: 200, type: Media})
  @Patch(':id')
  @Roles("ROLE_ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of uploads',
    type: FileUploadDto,
  })
  update(@Param('id') id: number, @UploadedFile() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(id, updateMediaDto);
  }


  @ApiBearerAuth()
  @ApiOperation({summary: "Remove upload"})
  @ApiResponse({status: 200, type: Media})
  @Delete(':id')
  @Roles("ROLE_ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.mediaService.remove(id);
  }
}
