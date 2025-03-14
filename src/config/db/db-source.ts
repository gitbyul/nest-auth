import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'developer',
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'], // 엔티티 파일 경로 설정
  namingStrategy: new SnakeNamingStrategy(),
});
