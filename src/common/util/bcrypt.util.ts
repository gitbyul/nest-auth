import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BCryptUtil {
  private readonly strength: number;
  private readonly BCRYPT_PATTERN = /^\$2[ayb]\$\d{2}\$[./0-9A-Za-z]{53}$/;

  constructor() {
    this.strength = 11;
  }

  async encode(rawPassword: string): Promise<string> {
    const saltRounds = this.strength;
    return await bcrypt.hash(rawPassword, saltRounds);
  }

  async matches(rawPassword: string, encodedPassword: string): Promise<boolean> {
    if (!this.BCRYPT_PATTERN.test(encodedPassword)) {
      return false;
    }
    return await bcrypt.compare(rawPassword, encodedPassword);
  }
}
