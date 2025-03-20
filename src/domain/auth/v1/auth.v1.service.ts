import { Injectable } from '@nestjs/common';
import { BCryptUtil } from 'src/common/util/bcrypt.util';
import { JwtUtil } from 'src/common/util/jwt.util';
import { PasswordUtil } from 'src/common/util/password.util';
import { RedisService } from 'src/config/cache/redis.service';
import { UsersEntityDto } from 'src/domain/user/users.dto';
import { Users } from 'src/domain/user/users.entity';
import { UsersService } from 'src/domain/user/users.service';
import { RedisKey } from '../../../config/cache/redis.enum';
import { ReqUserLoginDto } from './dto/req.user.login.dto';
import { ReqUserSaveDto } from './dto/req.user.save.dto';

@Injectable()
export class AuthV1Service {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordEncoder: BCryptUtil,
    private readonly passwordUtil: PasswordUtil,
    private readonly jwtUtil: JwtUtil,
    private readonly redisService: RedisService,
  ) {}
  getHello(): string {
    return 'Hello AuthV1Controller';
  }

  /**
   *
   * @param dto
   * @param requestIp
   * @returns Promise<number | Error> / userId or Exception
   */
  async save(dto: ReqUserSaveDto, requestIp: string): Promise<number | Error> {
    const email = dto.email;
    const nickname = dto.nickname;
    const password = dto.password;

    this.passwordUtil.setEmailAndName(email, nickname);
    const isValidPassword = this.passwordUtil.isValid(password);
    if (!isValidPassword) {
      throw new Error('패스워드 유효성 검사 실패');
    }

    const isExiststEmail = await this.usersService.existsByEmail(email);
    if (isExiststEmail) {
      throw new Error('이미 존재하는 이메일');
    }

    const userEntityDto: UsersEntityDto = {
      email,
      nickname,
      password,
      createdIp: requestIp,
      updatedIp: requestIp,
    };
    const userEntity: Users =
      await this.usersService.createUserEntity(userEntityDto);
    return await this.usersService.save(userEntity);
  }

  async login(dto: ReqUserLoginDto, requestIp: string) {
    const email = dto.email;
    const password = dto.password;

    const entity = await this.usersService.findByEmail(email);
    if (!entity) {
      throw new Error('접속 정보가 잘못 되었습니다. [email]');
    }

    const entityPassword = entity.password;
    const isMatchPassword = await this.passwordEncoder.matches(
      password,
      entityPassword,
    );
    if (!isMatchPassword) {
      throw new Error('접속 정보가 잘못 되었습니다. [password]');
    }

    const jwtPayload = { id: entity.id, email, nickname: entity.nickname };
    const { token: accessToken, exp } =
      await this.jwtUtil.generateAccessToken(jwtPayload);
    const refreshToken = await this.jwtUtil.generateRefreshToken(jwtPayload);

    const key = this.redisService.makeKey(RedisKey.AUTH, [accessToken]);
    const value = requestIp;
    await this.redisService.save(key, value, exp);

    entity.refreshToken = refreshToken;
    await this.usersService.loginUpdate(entity, requestIp);

    return { accessToken, refreshToken };
  }

  async logout(accessToken: string, refreshToken: string, requestIp: string) {
    const key = this.redisService.makeKey(RedisKey.AUTH, [accessToken]);
    await this.redisService.del(key);
    
    const entity = await this.usersService.findByRefreshToken(refreshToken);
    if (entity) {
      entity.lastLogoutAt = new Date();
      entity.lastLogoutIp = requestIp;
      entity.refreshToken = null;
    }
  }
}
