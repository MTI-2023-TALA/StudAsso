# Stud Asso

// TODO: Add Logo

![Issue](https://img.shields.io/github/issues/MTI-2023-TALA/StudAsso)
![Stars](https://img.shields.io/github/stars/MTI-2023-TALA/StudAsso)
![Licenses](https://img.shields.io/github/license/MTI-2023-TALA/StudAsso)

Since the health crisis, the associative life has difficulties relaunching itself and the multiplicity of communication platforms makes the whole chaotic.

The Stud'Asso project aims to relaunch and simplify communication between associations and students. But also to simplify the management processes of associations, from recruitment to the publication of events, all customizable by the user.

Moreover, the application will simplify the exchanges between associations and school's administration in order to allow the latter to obtain a simple vision of all the associations through statistics.

## Installation Guide

Required softwares to run the application:

- Node
- Npm

You can find the exact Node version in `.nvmrc`

We recommend having Nx globaly installed:

```bash
npm install -g nx
```

Install the dependencies:

```bash
npm ci
```

Running the project:

```bash
nx serve backend # Port: 3333
nx serve frontend-school # Port: 4200
nx serve frontend-association # Port: 4201
nx serve frontend-student
```

### PostgreSQL installation

We are using PostgreSQL to manage our data.
We recommend using docker to install it.

```
docker-compose -f docker-compose.yml up -d database
```

### Creating a migration

```bash
npm run migration:create -- -n migration_name
```

### Running migrations

```bash
npm run migration:run
```

### Revert migration

```bash
npm run migration:revert
```

### Install the precommit

It should be automatically installed when running:

```
npm ci
```

## Running the linter

You can run the linter using:

```
nx affected:lint
```

## Running test

You can run the test using:

```
nx affected:test
```

## How to add a new feature in backend

When creating a new ressource:

- add dtos to libs/shared/dtos/src/lib, and export them in libs/shared/dtos/src/index.ts
- add entities to libs/backend/core/orm/src/lib and export them in libs/backend/core/orm/src/index.ts
- add feature to libs/backend/feature/
