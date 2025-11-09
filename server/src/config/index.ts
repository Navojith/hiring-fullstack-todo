import fs from 'fs';
import path from 'path';

type Config = {
  app: { port: number; basePath: string; swaggerPath: string };
  mongo: { uri: string };
  security: { rateLimit: { windowMs: number; max: number } };
};

const configPath = path.join(__dirname, 'config.json');
const raw = fs.readFileSync(configPath, 'utf-8');
const parsed = JSON.parse(raw) as Config;

export default parsed;
