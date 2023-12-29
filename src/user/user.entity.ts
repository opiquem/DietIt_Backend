import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { Gender } from './types/gender.enum';
import { DietEntity } from '../diet/diet.entity';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true, default: null })
  height: number;

  @Column({ nullable: true, default: null })
  weight: number;

  @Column({ nullable: true, default: null })
  calories: number;

  @Column({ nullable: true, type: 'enum', enum: Gender, default: null })
  gender: Gender;

  @Column({ select: false })
  password: string;

  @Column({ default: 0 })
  role: number;

  @OneToMany(() => DietEntity, (diet) => diet.id, { cascade: ['remove'] })
  diets: DietEntity[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
