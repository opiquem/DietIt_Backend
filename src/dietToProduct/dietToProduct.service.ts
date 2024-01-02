import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DietToProductEntity } from "./dietToProduct.entity";
import { AddProductDto } from "./dto/addProduct.dto";
import { DietService } from "../diet/diet.service";
import { ProductService } from "../product/product.service";
import { UpdateDietDto } from "src/diet/dto/updateDiet.dto";
import { DeleteProductDto } from "./dto/deleteProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";

@Injectable()
export class DietToProductService {
  constructor(
    @InjectRepository(DietToProductEntity)
    private readonly dietToProductRepository: Repository<DietToProductEntity>,
    private readonly dietService: DietService,
    private readonly productService: ProductService,
  ) { }

  async addProductToDiet(addProductDto: AddProductDto): Promise<DietToProductEntity> {
    const newDietToProductEntity = new DietToProductEntity();

    const foundDiet = await this.dietService.getDiet(addProductDto.dietId);
    const foundProduct = await this.productService.getProductById(addProductDto.productId);


    newDietToProductEntity.diet = foundDiet;
    newDietToProductEntity.product = foundProduct;
    newDietToProductEntity.weight = addProductDto.weight;

    const updateDietDto: UpdateDietDto = { calories: (foundDiet.calories + (addProductDto.weight * foundProduct.caloriesPerGram)) }

    await this.dietService.updateDiet(addProductDto.dietId, updateDietDto);

    return this.dietToProductRepository.save(newDietToProductEntity);
  }

  async deleteProductFromDiet(deleteProductDto: DeleteProductDto): Promise<void> {

    const foundDiet = await this.dietService.getDiet(deleteProductDto.dietId);
    const foundProduct = await this.productService.getProductById(deleteProductDto.productId);

    //@ts-ignore
    const foundDietToProductEntity = await this.dietToProductRepository.findOne({ where: { product: foundProduct, diet: foundDiet } });

    const updateDietDto: UpdateDietDto = { calories: (foundDiet.calories - foundDietToProductEntity.weight) }

    await this.dietService.updateDiet(deleteProductDto.dietId, updateDietDto);

    this.dietToProductRepository.delete(foundDietToProductEntity.id);
  }

  async consumeProductFromDiet(updateProductDto: UpdateProductDto): Promise<DietToProductEntity> {

    const foundDiet = await this.dietService.getDiet(updateProductDto.dietId);
    const foundProduct = await this.productService.getProductById(updateProductDto.productId);

    console.log(foundDiet);
    console.log(foundProduct);
    //@ts-ignore
    const foundDietToProductEntity = await this.dietToProductRepository.findOne({ where: { diet: foundDiet, product: foundProduct, } });

    foundDietToProductEntity.consumed = updateProductDto.consumed;
    console.log(foundDietToProductEntity);
    return this.dietToProductRepository.save(foundDietToProductEntity);
  }
}
