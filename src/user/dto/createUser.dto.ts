import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  readonly height: number;

  @IsNumber()
  @IsNotEmpty()
  readonly weight: number;

  @IsNotEmpty()
  readonly password: string;
}
