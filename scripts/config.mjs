import { existsSync, writeFileSync } from 'node:fs';
if (existsSync('.env')) process.loadEnvFile('.env');
const key = process.env.GIPHY_API_KEY?.trim() || '';
writeFileSync('src/config.generated.ts', 'export const apiKey = ' + JSON.stringify(key) + ';\n');
