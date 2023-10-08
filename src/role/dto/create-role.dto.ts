import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @IsString({message: "Value should be string"})
  @IsNotEmpty({message: "Value should not be empty"})
  readonly value: string;
  @IsString({message: "Description should be string"})
  @IsNotEmpty({message: "Description should not be empty"})
  readonly description: string;
}
