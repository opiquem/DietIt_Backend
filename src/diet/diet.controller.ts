import { Controller } from "@nestjs/common";
import { DietService } from "./diet.service";

@Controller()
export class DietController {
  constructor(private readonly dietService: DietService) { }
}