import { DietEntity } from '../diet/diet.entity';
import { ProductEntity } from '../product/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dietToProducts' })
export class DietToProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({default: false})
  consumed: boolean;

  @Column()
  weight: number;

  @ManyToOne(() => DietEntity, diet => diet.products)
  diet: DietEntity;

  @ManyToOne(() => ProductEntity, product => product.diets)
  product: ProductEntity;

}
