import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { DietToProductService } from "./dietToProduct.service";
import { AuthGuard } from "../user/guards/auth.guard";
import { AddProductDto } from "./dto/addProduct.dto";
import { DietToProductEntity } from "./dietToProduct.entity";

@Controller('/dietToProduct')
export class DietToProductController {
  constructor(private readonly dietToProductService: DietToProductService) { }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async addProduct(@Body('productToDiet') addProductDto: AddProductDto): Promise<DietToProductEntity> {
    const dietToProduct = await this.dietToProductService.addProductToDiet(addProductDto);

    return dietToProduct;
  }

}