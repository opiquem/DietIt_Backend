import { IsNotEmpty } from 'class-validator';

export class UpdateDietDto {
  @IsNotEmpty()
  readonly name: string;
}
