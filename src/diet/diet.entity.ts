import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'diets' })
export class DietEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  calories: number;

  @ManyToOne(() => UserEntity, (user) => user.diets, {eager: true})
  user: UserEntity;
}
