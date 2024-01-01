import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "src/user/guards/auth.guard";
import { CreateProductDto } from "./dto/createProduct.dto";
import { ProductEntity } from "./product.entity";
import { UpdateProductDto } from "./dto/updateProduct.dto";

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  @UseGuards(AuthGuard)
  async getProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getProductById(@Param() params: any) {
    const product = await this.productService.getProductById(params.id);

    return product;
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createProduct(
    @Body('product') createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const product = await this.productService.createProduct(createProductDto);

    return product;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param() param: any, @Body('product') updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    const updatedProduct = await this.productService.updateProduct(param.id, updateProductDto);

    return updatedProduct;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async removeProduct(@Param() param: any): Promise<void> {
    return await this.productService.deleteProduct(param.id);
  }
}