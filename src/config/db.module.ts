import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseType } from 'src/common/dto/orm.config.dto';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule, // ConfigModule 추가
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigService 사용을 위해 추가
      inject: [ConfigService], // ConfigService 주입
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<DatabaseType>('DB_TYPE', 'mysql') as any, // ✅ 직접 적용
        host: configService.get<string>('DB_HOST', '127.0.0.1'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASSWORD', 'root'),
        database: configService.get<string>('DB_SCHEMA', 'test_db'),
        synchronize: false,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        extra: {
          connectionLimit: configService.get<number>('DB_CON_POOL', 1),
        },
      }),
    }),
  ],
})
export class DBModule {}
