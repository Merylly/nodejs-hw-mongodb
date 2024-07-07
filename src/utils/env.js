import dotenv from 'dotenv';

dotenv.config();

export const env = (envName, defaultEnv) => {
  if (process.env[envName]) return process.env[envName];
  if (defaultEnv) return defaultEnv;

  throw new Error(`Env var ${envName} is not found.`);
};
