import { DietToProductEntity } from '../dietToProduct/dietToProduct.entity';
import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'diets' })
export class DietEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: 0 })
  calories: number;

  @ManyToOne(() => UserEntity, (user) => user.diets)
  user: UserEntity;

  @OneToMany(() => DietToProductEntity, dietToProductEntity => dietToProductEntity.diet)
  products: DietToProductEntity[];
}
