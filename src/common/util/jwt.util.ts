import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { JWT_TYPE } from '../enums/jwt.enum';

@Injectable()
export class JwtUtil {
  private accessSecret: string;
  private accessExpires: number;
  private refreshSecret: string;
  private refreshExpires: number;

  constructor(private readonly configService: ConfigService) {
    this.accessSecret = this.configService.get<string>(
      'JWT_ACCESS_SECRET',
      'local-act',
    );
    this.accessExpires = this.configService.get<number>(
      'JWT_ACCESS_EXPIRES',
      60 * 15,
    );
    this.refreshSecret = this.configService.get<string>(
      'JWT_REFRESH_SECRET',
      'local-rct',
    );
    this.refreshExpires = this.configService.get<number>(
      'JWT_REFRESH_EXPIRES',
      7 * 24 * 60 * 60,
    );
  }

  // JWT 토큰 생성
  async generateAccessToken(payload: any) {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpires,
    });
  }

  async generateRefreshToken(payload: any) {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpires,
    });
  }

  // JWT 토큰 검증
  async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.accessSecret);
    } catch (error) {
      throw new Error('Invalid Token');
    }
  }

  async getJwtPayload(token: string) {
    return jwt.decode(token) as jwt.JwtPayload;
  }

  async getBearerJwtPayload(BearerToken: string) {
    const token = BearerToken.split(' ')[1];
    return jwt.decode(token) as jwt.JwtPayload;
  }

  async getJwtVerifyPayload(type: JWT_TYPE, token: string) {
    const key =
      type === JWT_TYPE.ACCESS_TOKEN ? this.accessSecret : this.refreshSecret;
    return jwt.verify(token, key) as jwt.JwtPayload;
  }
}
