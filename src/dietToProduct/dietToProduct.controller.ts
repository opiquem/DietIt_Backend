import { Body, Controller, Delete, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { DietToProductService } from "./dietToProduct.service";
import { AuthGuard } from "../user/guards/auth.guard";
import { AddProductDto } from "./dto/addProduct.dto";
import { DietToProductEntity } from "./dietToProduct.entity";
import { DeleteProductDto } from "./dto/deleteProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";

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
  
  @Delete()
  @UsePipes(new ValidationPipe())
  async deleteProduct(@Body('productToDiet') deleteProductDto: DeleteProductDto): Promise<void> {
    const dietToProduct = await this.dietToProductService.deleteProductFromDiet(deleteProductDto);

    return dietToProduct;
  }
  
  @Post('/consume')
  @UsePipes(new ValidationPipe())
  async consumeProduct(@Body('productToDiet') updateProductDto: UpdateProductDto): Promise<DietToProductEntity> {
    const dietToProduct = await this.dietToProductService.consumeProductFromDiet(updateProductDto);

    return dietToProduct;
  }

}