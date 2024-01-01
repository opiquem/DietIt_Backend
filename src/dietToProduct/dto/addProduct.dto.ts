import { IsNotEmpty, IsNumber } from "class-validator";

export class AddProductDto {
  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;
  
  @IsNotEmpty()
  @IsNumber()
  readonly dietId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
}