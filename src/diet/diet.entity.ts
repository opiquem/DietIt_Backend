import { DietToProductEntity } from '../dietToProduct/dietToProduct.entity';
import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'diets' })
export class DietEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  calories: number;

  @ManyToOne(() => UserEntity, (user) => user.diets, { eager: true })
  user: UserEntity;

  @OneToMany(() => DietToProductEntity, dietToProductEntity => dietToProductEntity.diet)
  products: DietToProductEntity[];
}
