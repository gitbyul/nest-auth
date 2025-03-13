import { Module } from '@nestjs/common';
import { BCryptUtil } from './util/bcrypt.util';
import { EncryptUtil } from './util/encrypt.util';
import { JsonUtil } from './util/json.util';
import { ValidationUtil } from './util/validation.util';

@Module({
  imports: [],
  providers: [
    BCryptUtil,
    EncryptUtil,
    ValidationUtil,
    JsonUtil,
  ],
  exports: [
    BCryptUtil,
    EncryptUtil,
    ValidationUtil,
    JsonUtil,
  ],
})
export class CommonModule {}
