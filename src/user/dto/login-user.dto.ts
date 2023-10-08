import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class LoginUserDto {
  @IsString({message: "Email should be string"})
  @IsNotEmpty({message: "Email should not be empty"})
  @IsEmail({}, {message: "Invalid email"})
  readonly email: string;
  @IsString({message: "Password should be string"})
  @IsNotEmpty({message: "Password should not be empty"})
  @MinLength(5, {message: "Password is too short"})
  readonly password: string;
}