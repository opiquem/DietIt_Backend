import { Controller } from "@nestjs/common";
import { DietToProductService } from "./dietToProduct.service";

@Controller('/products')
export class DietToProductController {
  constructor(private readonly dietToProductService: DietToProductService) { }


}