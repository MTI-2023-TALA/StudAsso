import { existsSync, openSync, writeFileSync } from 'fs';

import chalk from 'chalk';
import path from 'path';
import { randomBytes } from 'crypto';

// Override console.log() to add [env-generator] prefix
const originalLog = console.log;
console.log = (...args: any[]) => {
  originalLog(chalk.blue('[env-generator]'), ...args);
};

const homeDir = path.normalize(`${__dirname}/../../`);
const envFilePath = path.normalize(`${homeDir}/.env`);

function doesEnvFileExist() {
  return existsSync(envFilePath);
}

function generateEnvFile() {
  function writeEnvVariable(file: number, key: string, value: string) {
    writeFileSync(file, `${key}=${value}\n`);
    console.log(chalk.green(`✔ Wrote ${key} to .env file`));
  }

  try {
    const envFile = openSync(envFilePath, 'w');
    writeEnvVariable(envFile, 'AT_SECRET', `"${randomBytes(256).toString('base64')}"`);
    writeEnvVariable(envFile, 'RT_SECRET', `"${randomBytes(256).toString('base64')}"`);
    writeEnvVariable(envFile, 'DATABASE_URL', '"postgresql://postgres:password@localhost:5432/studasso?schema=public"');
  } catch {
    console.log(chalk.red('❌ Failed to write to .env file'));
  }
}

function main() {
  console.log(chalk.green('Starting script...'));
  if (doesEnvFileExist()) {
    console.log(chalk.red('File already exists, skipping...'));
    return;
  }

  console.log(chalk.yellow('.env file not found, generating .env file...'));
  generateEnvFile();
  console.log(chalk.green('.env generated!'));
}

main();
