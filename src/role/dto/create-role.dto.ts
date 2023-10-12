import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({example: 'ROLE_USER', description: 'Role'})
  @IsString({message: "Value should be string"})
  @IsNotEmpty({message: "Value should not be empty"})
  readonly value: string;
  @ApiProperty({example: 'Regular user', description: 'description'})
  @IsString({message: "Description should be string"})
  @IsNotEmpty({message: "Description should not be empty"})
  readonly description: string;
}
