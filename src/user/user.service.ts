import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Gender } from './types/gender.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };

    const userByEmail = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userByEmail) {
      errorResponse.errors['email'] = 'Email has been already taken';
    }

    if (userByEmail) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }
  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {
        'email or password': 'is invalid',
      },
    };

    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
      select: ['id', 'name', 'email', 'height', 'weight', 'password', 'role'],
    });

    if (!user) {
      throw new HttpException(errorResponse, HttpStatus.NOT_FOUND);
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    delete user.password;

    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);

    const areUserDataGiven = !!(updateUserDto.height && updateUserDto.weight);

    const { gender } = user;

    if (areUserDataGiven) {
      switch (gender) {
        case Gender.Male:
          user.calories = 66 + Math.round(5 * updateUserDto.height) + Math.round(13.7 * updateUserDto.weight);
          break;

        case Gender.Female:
          user.calories = 655 + Math.round(1.8 * updateUserDto.height) + Math.round(9.6 * updateUserDto.weight);
          break;

        default:
          break;
      }
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async deleteUser(userId): Promise<DeleteResult> {
    return await this.userRepository.delete(userId);
  }
}
