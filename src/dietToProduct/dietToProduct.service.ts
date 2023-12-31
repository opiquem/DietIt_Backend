import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DietToProductEntity } from "./dietToProduct.entity";

@Injectable()
export class DietToProductService {
  constructor(
    @InjectRepository(DietToProductEntity)
    private readonly dietToProductRepository: Repository<DietToProductEntity>,
  ) { }

}
