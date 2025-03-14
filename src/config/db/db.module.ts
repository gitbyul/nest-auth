import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-ioredis';
import { DatabaseType } from 'src/common/dto/orm.config.dto';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<DatabaseType>('DB_TYPE', 'mysql') as any,
        host: configService.get<string>('DB_HOST', '127.0.0.1'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASSWORD', 'root'),
        database: configService.get<string>('DB_SCHEMA', 'test_db'),
        synchronize: false,
        autoLoadEntities: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
        extra: {
          connectionLimit: configService.get<number>('DB_CON_POOL', 1),
        },
      }),
    }),

    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        stores: redisStore,
        host: configService.get<string>('REDIS_HOST', 'localhost'),
        port: configService.get<number>('REDIS_PORT', 6379 ),
        auth_pass: configService.get<number>('REDIS_AUTH_PASS', 1234),
        ttl: configService.get<number>('CACHE_TTL', 10),
      }),
    }),
  ],
})
export class DBModule {}
