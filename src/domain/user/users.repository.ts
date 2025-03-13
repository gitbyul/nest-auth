import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersEntityDto } from './users.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersRepository {
  private readonly usersRepository: Repository<Users>;
  constructor(private readonly dataSource: DataSource) {
    this.usersRepository = this.dataSource.getRepository(Users);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOneOrFail(email: string) {
    return await this.usersRepository.findOneOrFail({ where: { email } });
  }

  async existsByEmail(email: string) {
    return await this.usersRepository.existsBy({ email });
  }

  createUserEntity(entity: UsersEntityDto) {
    return this.usersRepository.create(entity);
  }

  async save(userEntity: Users) {
    return await this.usersRepository
      .save(userEntity)
      .then((entity) => entity.id)
      .catch(() => new Error('유저 생성 실패'));
  }

  async update(entity: Users) {
    return await this.usersRepository.save(entity);
  }
}
