import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntityDto } from './users.dto';
import { UsersRepository } from './users.repository';

@Entity()
export class Users {
  constructor(private readonly usersRepository: UsersRepository) {}
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 500 })
  email: string;

  @Column({ type: 'varchar', length: 500 })
  nickname: string;

  @Column({ type: 'varchar', length: 500 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 100 })
  createdIp: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updatedIp: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastLoginIp: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogoutAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastLogoutIp: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  refreshToken: string;

  toEntity(entity: UsersEntityDto): Users {
    return this.usersRepository.createUserEntity(entity);
  }
}
