import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtUtil {
  private secret: string;
  private refreshSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.get<string>('JWT_SECRET', '');
    this.refreshSecret = this.configService.get<string>(
      'JWT_REFRESH_SECRET',
      '',
    );
  }

  // JWT 토큰 생성
  async generateAccessToken(payload: any): Promise<string> {
    const token = jwt.sign(payload, this.secret, {
      expiresIn: '15m',
    });

    return `Bearer ${token}`;
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: '7d',
    });
  }

  // JWT 토큰 검증
  async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid Token');
    }
  }

  async getJwtPayload(token: string) {
    return jwt.decode(token) as jwt.JwtPayload;
  }

  async getJwtVerifyPayload(token: string, type: 'ACT' | 'RCT') {
    let key = type === 'ACT' ? this.secret : this.refreshSecret;
    return jwt.verify(token, key) as jwt.JwtPayload;
  }
}
