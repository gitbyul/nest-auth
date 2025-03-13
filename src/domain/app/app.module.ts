import { Module } from '@nestjs/common';
import { DBModule } from 'src/config/db/db.module';
import { EnvModule } from 'src/config/env/env.module';
import { LogModule } from 'src/config/log/log.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EnvModule, DBModule, LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
