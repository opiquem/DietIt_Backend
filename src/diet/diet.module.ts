import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../user/guards/auth.guard';
import { DietEntity } from './diet.entity';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';

@Module({
  imports: [TypeOrmModule.forFeature([DietEntity])],
  controllers: [DietController],
  providers: [DietService, AuthGuard],
  exports: [DietService],
})
export class UserModule { }
