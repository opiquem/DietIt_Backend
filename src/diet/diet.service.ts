import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DietEntity } from "./diet.entity";
import { Repository } from "typeorm";
import { CreateDietDto } from "./dto/createDiet.dto";
import { UserEntity } from "src/user/user.entity";
import { UpdateDietDto } from "./dto/updateDiet.dto";

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

  async updateDiet(id: number, updateDietDto: UpdateDietDto): Promise<DietEntity> {
    const diet = await this.getDiet(id);

    Object.assign(diet, updateDietDto);

    return this.dietRepository.save(diet);
  }
}
