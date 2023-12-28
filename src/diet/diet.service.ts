import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DietEntity } from "./diet.entity";
import { Repository } from "typeorm";

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(DietEntity)
    private readonly userRepository: Repository<DietEntity>,
  ) { }
}
