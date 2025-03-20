import { z } from 'zod';

export const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['local', 'prod']),
  SERVER_PORT: z.string().transform(Number),
  ENC_ALGORITHM: z.string(),
  ENC_SECRETKEY: z.string(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),

  // DB
  DB_CON_POOL: z.string().transform(Number),
  DB_TYPE: z.enum([
    'mysql',
    'postgres',
    'cockroachdb',
    'sap',
    'mariadb',
    'sqlite',
    'cordova',
    'react-native',
    'nativescript',
    'sqljs',
    'oracle',
    'mssql',
    'mongodb',
    'aurora-mysql',
    'aurora-postgres',
    'expo',
    'better-sqlite3',
    'capacitor',
    'spanner',
  ]),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform(Number),
  DB_SCHEMA: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_CRYPTO_KEY: z.string(),

  // Redis
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),
  REDIS_USER: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_DEFULT_TTL: z.string().transform(Number),
  REDIS_LRU_SIZE: z.string().transform(Number),
  REDIS_DEEP_CLONE: z.string().transform(Boolean),
  REDIS_CHECK_INTERVAL: z.string().transform(Number),
});

export type EnvVariables = z.infer<typeof envSchema>;
