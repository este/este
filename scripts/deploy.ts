import { execSync } from 'child_process';
import fs from 'fs';

// Workaround for: https://github.com/zeit/ncc/issues/239
const tsConfigOriginal = fs.readFileSync('tsconfig.json', 'utf8');
const tsConfigForNow = JSON.parse(tsConfigOriginal);
tsConfigForNow.compilerOptions.noEmit = false;
fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfigForNow, null, 2));

execSync('now -e API_SECRET -e PRISMA_ENDPOINT -e PRISMA_SECRET', {
  env: process.env,
  stdio: 'inherit',
});

fs.writeFileSync('tsconfig.json', tsConfigOriginal);
