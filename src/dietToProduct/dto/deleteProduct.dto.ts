import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteProductDto {
  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;
  
  @IsNotEmpty()
  @IsNumber()
  readonly dietId: number;
}