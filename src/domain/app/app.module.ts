import { Module } from '@nestjs/common';
import { DBModule } from 'src/config/db/db.module';
import { EnvModule } from 'src/config/env/env.module';
import { LogModule } from 'src/config/log/log.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/common/interceptor/response.intercepetor';

@Module({
  imports: [EnvModule, DBModule, LogModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
