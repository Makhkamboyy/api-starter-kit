import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDto {
  @IsString({message: 'Image should be string'})
  @IsNotEmpty({ message: "Image can not empty" })
  readonly image: string;
}
