import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../user/guards/auth.guard';
import { DietToProductEntity } from './dietToProduct.entity';
import { DietToProductController } from './dietToProduct.controller';
import { DietToProductService } from './dietToProduct.service';
import { DietService } from '../diet/diet.service';
import { ProductService } from '../product/product.service';
import { DietEntity } from '../diet/diet.entity';
import { ProductEntity } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DietToProductEntity, DietEntity, ProductEntity])],
  controllers: [DietToProductController],
  providers: [DietToProductService, AuthGuard, DietService, ProductService],
  exports: [DietToProductService],
})
export class DietToProductModule { }
