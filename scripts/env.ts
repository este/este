// https://github.com/motdotla/dotenv
import fs from 'fs';

// `yarn env dev` will copy `.env.dev` file to `.env` file.

const from = `.env.${process.argv[process.argv.length - 1]}`;
const to = '.env';

fs.copyFileSync(from, to);

// tslint:disable-next-line:no-console
console.log(`${from} copied to ${to}`);
