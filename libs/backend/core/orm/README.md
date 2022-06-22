# ORM lib

## Work with prisma

To create a migration without modifications:

```sh
npx prisma migrate dev
```

To customize your migration:

```sh
npx prisma migrate dev --create-only

# once you're finished customizing:

npx prisma migrate dev
```

To run new migrations after a pull

```sh
npx prisma migrate dev
```

To generate PrismaClient (to do after each modification in database schema (prisma.schema)):

```sh
npx prisma generate
```
