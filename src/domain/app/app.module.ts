import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/common/interceptor/response.intercepetor';
import { DBModule } from 'src/config/db/db.module';
import { EnvModule } from 'src/config/env/env.module';
import { LogModule } from 'src/config/log/log.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EnvModule, DBModule, LogModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
