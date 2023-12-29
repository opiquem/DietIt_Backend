import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { DietService } from "./diet.service";
import { AuthGuard } from "src/user/guards/auth.guard";
import { User } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/user.entity";
import { CreateDietDto } from "./dto/createDiet.dto";
import { DietEntity } from "./diet.entity";
import { UpdateDietDto } from "./dto/updateDiet.dto";

@Controller('/diets')
export class DietController {
  constructor(private readonly dietService: DietService) { }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('diet') createDietDto: CreateDietDto
  ): Promise<DietEntity> {
    const diet = await this.dietService.createDiet(currentUser, createDietDto);

    return diet;
  };

  @Get(':id')
  @UseGuards(AuthGuard)
  async getDietById(@Param() params: any) {
    const diet = await this.dietService.getDiet(params.id);

    return diet;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateDiet(@Param() params: any, @Body('diet') updateDietDto: UpdateDietDto): Promise<DietEntity> {
    const diet = await this.dietService.updateDiet(params.id, updateDietDto);

    return diet;
  }
}