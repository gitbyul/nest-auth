import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from 'src/config/env.module';
import { DBModule } from 'src/config/db.module';

@Module({
  imports: [EnvModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
