import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserPersonDto {
  @ApiProperty({ example: "John", description: "First name" })
  @IsString({message: "Name should be string"})
  @IsNotEmpty({message: "Name should not be empty"})
  @MinLength(2, {message: "Name is too short"})
  readonly name: string;
  @ApiProperty({ example: "Doe", description: "Lastname" })
  @IsString({message: "Second name should be string"})
  @IsNotEmpty({message: "Second name should not be empty"})
  @MinLength(2, {message: "Second name is too short"})
  readonly sname: string;
  @ApiProperty({ example: "+37127306844", description: "Phone" })
  @IsString({message: "Phone should be string"})
  @IsNotEmpty({message: "Phone should not be empty"})
  @MinLength(5, {message: "Phone is too short"})
  @Matches(/^\+\d{1,15}$/, { message: "Phone is incorrect" })
  readonly phone: string;
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
