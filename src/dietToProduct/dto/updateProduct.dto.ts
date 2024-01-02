import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;
  
  @IsNotEmpty()
  @IsNumber()
  readonly dietId: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly consumed: boolean;
}