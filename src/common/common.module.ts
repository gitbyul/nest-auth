import { Module } from '@nestjs/common';
import { BCryptUtil } from './util/bcrypt.util';
import { EncryptUtil } from './util/encrypt.util';
import { JwtUtil } from './util/jwt.util';
import { PasswordUtil } from './util/password.util';
import { ValidationUtil } from './util/validation.util';

@Module({
  imports: [],
  providers: [BCryptUtil, EncryptUtil, ValidationUtil, PasswordUtil, JwtUtil],
  exports: [BCryptUtil, EncryptUtil, ValidationUtil, PasswordUtil, JwtUtil],
})
export class CommonModule {}
