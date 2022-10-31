import { exec, execSync } from 'child_process';

import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

interface Arguments {
  runDb: string;
  migrateDb: string;
  parallel: number;
  projects: string;
}

// Override console.log() to add [run-app] prefix
const originalLog = console.log;
console.log = (...args: any[]) => {
  originalLog(chalk.blue('[run-app]'), ...args);
};

function runDb() {
  console.log(chalk.green('Starting database...'));
  try {
    execSync('docker-compose up -d database redis', { stdio: 'inherit' });
    console.log(chalk.green('✔ Database started'));
  } catch {
    console.log(chalk.red('❌ Failed to start database'));
  }
}

function migrateDb() {
  console.log(chalk.green('Migrating database...'));
  try {
    execSync('npx prisma migrate dev', { stdio: 'inherit' });
    console.log(chalk.green('✔ Database migrated'));
  } catch {
    console.log(chalk.red('❌ Failed to migrate database'));
    return;
  }

  console.log(chalk.green('Generating Prisma client...'));
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log(chalk.green('✔ Prisma client generated'));
  } catch {
    console.log(chalk.red('❌ Failed to generate Prisma client'));
    return;
  }
}

function runApp(projects: string, parallel: number) {
  console.log(chalk.green('Starting app...'));
  try {
    const nxCmd = `nx run-many --target=serve --projects=${projects} --parallel=${parallel}`;
    execSync(nxCmd, { stdio: 'inherit' });
  } catch {
    console.log(chalk.red('❌ Failed to start app'));
  }
}

function main(argv: Arguments) {
  // Start the database
  if (argv.runDb === 'true') {
    runDb();
  } else {
    console.log(chalk.yellow('Skipping database...'));
  }

  // Migrate the database
  if (argv.migrateDb === 'true') {
    migrateDb();
  } else {
    console.log(chalk.yellow('Skipping migrations...'));
  }

  // Start the app
  runApp(argv.projects, argv.parallel);
}

const argv: Arguments = yargs(hideBin(process.argv)).argv as any as Arguments;
main(argv);
