import { registerAs } from '@nestjs/config';

import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { DatabaseConfig } from './database-config.type';
import * as process from 'node:process';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.DATABASE_URL)
  @IsString()
  DATABASE_URL: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_TYPE: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_HOST: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_NAME: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME: string;

  @ValidateIf((envValues) => envValues.DATABASE_URL_2)
  @IsString()
  DATABASE_URL_2: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL_2)
  @IsString()
  DATABASE_TYPE_2: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL_2)
  @IsString()
  DATABASE_USERNAME_2: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL_2)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT_2: number;

  @ValidateIf((envValues) => !envValues.DATABASE_URL_2)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PASSWORD_2: number;

  @ValidateIf((envValues) => !envValues.DATABASE_URL_2)
  @IsString()
  DATABASE_NAME_2: string;

  @IsBoolean()
  @IsOptional()
  DATABASE_SYNCHRONIZE: boolean;

  @IsInt()
  @IsOptional()
  DATABASE_MAX_CONNECTIONS: number;

  @IsBoolean()
  @IsOptional()
  DATABASE_SSL_ENABLED: boolean;

  @IsBoolean()
  @IsOptional()
  DATABASE_REJECT_UNAUTHORIZED: boolean;

  @IsString()
  @IsOptional()
  DATABASE_CA: string;

  @IsString()
  @IsOptional()
  DATABASE_KEY: string;

  @IsString()
  @IsOptional()
  DATABASE_CERT: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    isDocumentDatabase: ['mongodb'].includes(process.env.DATABASE_TYPE ?? ''),
    url: process.env.DATABASE_URL,
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    maxConnections: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
    rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
    ca: process.env.DATABASE_CA,
    key: process.env.DATABASE_KEY,
    cert: process.env.DATABASE_CERT,

    type2: process.env.DATABASE_TYPE_2,
    port2: process.env.DATABASE_PORT_2
      ? parseInt(process.env.DATABASE_PORT_2, 10)
      : 27017,
    username2: process.env.DATABASE_USERNAME_2,
    password2: process.env.DATABASE_PASSWORD_2,
    name2: process.env.DATABASE_NAME_2,
    url2: process.env.DATABASE_URL_2,
  };
});
