import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/domain/user/users.repository';
import { UsersEntityDto } from './users.dto';
import { Users } from './users.entity';
import { EncryptUtil } from 'src/common/util/encrypt.util';
import { BCryptUtil } from 'src/common/util/bcrypt.util';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordEncoder: BCryptUtil,
    private readonly encoder: EncryptUtil,
  ) {}

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async findOneOrFail(email: string) {
    return await this.usersRepository.findOneOrFail(email);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.usersRepository.existsByEmail(email);
  }

  async createUserEntity(dto: UsersEntityDto): Promise<Users> {
    const encryptDto: UsersEntityDto = {
      email: dto.email,
      nickname: dto.nickname,
      password: await this.passwordEncoder.encode(dto.password),
      createdIp: this.encoder.encrypt(dto.createdIp),
    };

    return this.usersRepository.createUserEntity(encryptDto);
  }

  async save(entity: Users) {
    return await this.usersRepository.save(entity);
  }

  async loginUpdate(entity: Users, requestIp: string) {
    const updateEntity = entity;
    updateEntity.lastLoginAt = new Date();
    updateEntity.lastLoginIp = this.encoder.encrypt(requestIp);

    return await this.usersRepository.save(entity);
  }
}
