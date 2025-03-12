import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { envSchema } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.local',
      validate: (config: Record<string, unknown>) => {
        const parsed = envSchema.safeParse(config);

        if (!parsed.success) {
          console.error(
            '❌ Invalid environment variables',
            parsed.error.format(),
          );
          process.exit(1);
        }

        return parsed.data;
      },
    }),
  ],
})
export class EnvModule {}
