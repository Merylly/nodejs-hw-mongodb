import path from 'node:path';

export const ONE_DAY = 24 * 60 * 60 * 1000;
export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const ENV_VARS = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_FROM: 'SMTP_FROM',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  JWT_SECRET: 'JWT_SECRET',
  APP_DOMAIN: 'APP_DOMAIN',
};

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
  ENABLE_CLOUDINARY: 'ENABLE_CLOUDINARY',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');