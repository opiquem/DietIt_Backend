import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DietToProductEntity } from "./dietToProduct.entity";
import { AddProductDto } from "./dto/addProduct.dto";
import { DietService } from "../diet/diet.service";
import { ProductService } from "../product/product.service";
import { UpdateDietDto } from "src/diet/dto/updateDiet.dto";

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
}
