import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "1", description: "PersonId" })
  @IsNumber({}, {message: "PersonId should be string"})
  @IsNotEmpty({message: "PersonId should not be empty"})
  readonly personId: number;
  @ApiProperty({ example: "doe@gmail.com", description: "Email" })
  @IsString({message: "Email should be string"})
  @IsNotEmpty({message: "Email should not be empty"})
  @IsEmail({}, {message: "Email is incorrect"})
  readonly email: string;
  @ApiProperty({ example: "12345", description: "Password" })
  @IsString({message: "Password should be string"})
  @IsNotEmpty({message: "Password should not be empty"})
  @MinLength(5, {message: "Password is too short"})
  readonly password: string;
}
