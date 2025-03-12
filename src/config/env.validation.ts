import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'prod']),
  SERVER_PORT: z.string().transform(Number),
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
});

export type EnvVariables = z.infer<typeof envSchema>;
