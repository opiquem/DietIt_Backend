import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/createProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) { }

  async getAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository
      .createQueryBuilder('products')
      .getMany();

    return products;
  }

  async getProductById(id: number): Promise<ProductEntity> {

    return this.productRepository.findOneBy({ id });
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {

    const newProduct = new ProductEntity();
    Object.assign(newProduct, createProductDto)

    return this.productRepository.save(newProduct);
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.getProductById(id);

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    this.productRepository.delete(id);
  }
}
