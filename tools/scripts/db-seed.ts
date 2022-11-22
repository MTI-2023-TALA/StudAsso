import * as argon from 'argon2';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createdAt = new Date('2022-01-01');
const updatedAt = new Date('2022-02-01');
const deletedAt = new Date('2022-03-01');

const userPassword = '123';

async function truncate() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
}

async function hashData(data: string): Promise<string> {
  return argon.hash(data);
}

const associations = [
  {
    name: 'Temple Jedi',
    description: 'A first nice description',
    createdAt,
    updatedAt,
    deletedAt,
  },
  {
    name: 'Gryffondor',
    description: 'A second nice description',
    createdAt,
    updatedAt,
    deletedAt: null,
  },
  {
    name: 'Poufsouffle',
    description: 'A third nice description',
    createdAt,
    updatedAt,
    deletedAt: null,
  },
  {
    name: 'Serdaigle',
    description: 'A fourth nice description',
    createdAt,
    updatedAt,
    deletedAt: null,
  },
  {
    name: 'Serpentard',
    description: 'A fifth nice description',
    createdAt,
    updatedAt,
    deletedAt: null,
  },
];

const userDetails = [
  {
    firstname: 'Albus',
    lastname: 'Dumbledore',
    email: 'albus.dumbledore@poudlard.com',
    isSchoolEmployee: true,
  },
  {
    firstname: 'Minerva',
    lastname: 'McGonagall',
    email: 'minerva.mcgonagall@poudlard.com',
    isSchoolEmployee: false,
  },
  {
    firstname: 'Pomona',
    lastname: 'Chourave',
    email: 'pomona.chourave@poudlard.com',
    isSchoolEmployee: false,
  },

  {
    firstname: 'Filius',
    lastname: 'Flitwick',
    email: 'filius.flitwick@poudlard.com',
    isSchoolEmployee: false,
  },
  {
    firstname: 'Severus',
    lastname: 'Rogue',
    email: 'severus.rogue@poudlard.com',
    isSchoolEmployee: false,
  },
];

async function createUsers() {
  const passwordHash = await hashData(userPassword);
  const [rtHash, googleId] = [null, null];

  const userPayload = { passwordHash, rtHash, googleId, createdAt, updatedAt, deletedAt: null };

  const users = userDetails.map((user) => ({ ...user, ...userPayload }));

  await prisma.user.createMany({
    data: users,
  });
}

async function main() {
  await truncate();

  await prisma.association.createMany({
    data: associations,
  });

  await createUsers();
}

main();
