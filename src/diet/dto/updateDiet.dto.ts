import { IsOptional } from 'class-validator';

export class UpdateDietDto {
  @IsOptional()
  readonly name?: string;
  
  @IsOptional()
  readonly calories: number;
}
