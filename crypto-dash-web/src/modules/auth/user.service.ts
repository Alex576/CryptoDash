import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   await queryRunner.manager.save(User, {});
    //   await queryRunner.commitTransaction();
    // } catch (error) {
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   await queryRunner.release();
    // }

    const newUser = this.userRepository.create();
    newUser.email = createUserDto.email;
    newUser.passwordHash = await bcrypt.hash(createUserDto.password, this.configService.getOrThrow('SALT'));
    return await this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByLogin(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  update(id: string, updateAuthDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update({ id }, { refreshToken: updateAuthDto.refreshToken });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
