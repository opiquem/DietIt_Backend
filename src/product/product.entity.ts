import { DietToProductEntity } from '../dietToProduct/dietToProduct.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  caloriesPerGram: number;

  @OneToMany(() => DietToProductEntity, dietToProductEntity => dietToProductEntity.product)
  diets: DietToProductEntity[];
}
