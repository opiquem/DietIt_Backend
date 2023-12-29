import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly caloriesPerGram: number;
}
