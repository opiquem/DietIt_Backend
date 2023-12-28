import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from '../types/gender.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;

  @IsNotEmpty()
  readonly password: string;
}
