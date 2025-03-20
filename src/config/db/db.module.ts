import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
        database: configService.get<string>('DB_SCHEMA', 'developer'),
        synchronize: false,
        autoLoadEntities: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
        extra: {
          connectionLimit: configService.get<number>('DB_CON_POOL', 1),
        },
      }),
    }),
  ],
})
export class DBModule {}
