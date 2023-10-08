import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString({message: "Name should be string"})
  @IsNotEmpty({message: "Name should not be empty"})
  @MinLength(2, {message: "Name is too short"})
  readonly name: string;
  @IsString({message: "Second name should be string"})
  @IsNotEmpty({message: "Second name should not be empty"})
  @MinLength(2, {message: "Second name is too short"})
  readonly sname: string;
  @IsString({message: "Phone should be string"})
  @IsNotEmpty({message: "Phone should not be empty"})
  @MinLength(5, {message: "Phone is too short"})
  @Matches(/^\+\d{1,15}$/, { message: "Phone is incorrect" })
  readonly phone: string;
  @IsString({message: "Email should be string"})
  @IsNotEmpty({message: "Email should not be empty"})
  @IsEmail({}, {message: "Email is incorrect"})
  readonly email: string;
  @IsString({message: "Password should be string"})
  @IsNotEmpty({message: "Password should not be empty"})
  @MinLength(5, {message: "Password is too short"})
  readonly password: string;
}
