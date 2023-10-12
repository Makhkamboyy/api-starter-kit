import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ example: "doe@gmail.com", description: "Email" })
  @IsString({message: "Email should be string"})
  @IsNotEmpty({message: "Email should not be empty"})
  @IsEmail({}, {message: "Invalid email"})
  readonly email: string;
  @ApiProperty({ example: "12345", description: "Password" })
  @IsString({message: "Password should be string"})
  @IsNotEmpty({message: "Password should not be empty"})
  @MinLength(5, {message: "Password is too short"})
  readonly password: string;
}