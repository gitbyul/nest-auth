import { Module, forwardRef } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/domain/user/users.module';
import { AuthV1Controller } from './auth.v1.controller';
import { AuthV1Service } from './auth.v1.service';

@Module({
  imports: [forwardRef(() => UserModule), CommonModule],
  controllers: [AuthV1Controller],
  providers: [AuthV1Service],
})
export class AuthV1Module {}
