import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../user/guards/auth.guard';
import { DietToProductEntity } from './dietToProduct.entity';
import { DietToProductController } from './dietToProduct.controller';
import { DietToProductService } from './dietToProduct.service';

@Module({
  imports: [TypeOrmModule.forFeature([DietToProductEntity])],
  controllers: [DietToProductController],
  providers: [DietToProductService, AuthGuard],
  exports: [DietToProductService],
})
export class DietToProductModule { }
