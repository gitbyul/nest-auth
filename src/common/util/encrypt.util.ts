import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptUtil {
  private algorithm: string;
  private secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.algorithm = this.configService.get<string>('ENC_ALGORITHM', '');
    this.secretKey = this.configService.get<string>('ENC_SECRETKEY', '');
  }

  encrypt(raw: string): string {
    const algorithm = this.algorithm;
    const secretKey = this.secretKey;
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(raw, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted; // IV와 암호문을 합쳐서 저장
  }

  // 복호화 함수
  decrypt(encrypted: string): string {
    const algorithm = this.algorithm;
    const secretKey = this.secretKey;
    const iv = Buffer.from(encrypted.slice(0, 32), 'hex'); // 앞 32글자가 IV
    const encryptedText = encrypted.slice(32); // 나머지가 암호문

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secretKey),
      iv,
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
