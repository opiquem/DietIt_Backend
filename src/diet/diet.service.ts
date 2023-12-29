import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DietEntity } from "./diet.entity";
import { Repository } from "typeorm";
import { CreateDietDto } from "./dto/createDiet.dto";
import { UserEntity } from "src/user/user.entity";

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(DietEntity)
    private readonly dietRepository: Repository<DietEntity>,
  ) { }

  async createDiet(currentUser: UserEntity, createDietDto: CreateDietDto): Promise<DietEntity> {

    const newDiet = new DietEntity();
    Object.assign(newDiet, createDietDto)

    newDiet.user = currentUser;

    return this.dietRepository.save(newDiet);
  }
  
  async getDiet(id: number): Promise<DietEntity> {

    return this.dietRepository.findOneBy({id});
  }
}
