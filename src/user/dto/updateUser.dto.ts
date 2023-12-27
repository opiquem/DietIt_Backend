import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  readonly name: string;

  @IsEmail()
  readonly email: string;

  readonly height: string;

  readonly weight: string;
}
