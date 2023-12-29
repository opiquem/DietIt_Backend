import { IsNotEmpty } from 'class-validator';

export class CreateDietDto {
  @IsNotEmpty()
  readonly name: string;
}
