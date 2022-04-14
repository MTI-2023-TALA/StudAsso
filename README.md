# Stud Asso

// TODO: Add Logo

![Issue](https://img.shields.io/github/issues/MTI-2023-TALA/StudAsso)
![Stars](https://img.shields.io/github/stars/MTI-2023-TALA/StudAsso)
![Licenses](https://img.shields.io/github/license/MTI-2023-TALA/StudAsso)

Since the health crisis, the associative life has had difficulty in relaunching itself and the multiplicity of the communication platforms makes the whole chaotic.

The Stud'Asso project aims to relaunch and simplify communication between associations and students. But also to simplify the management processes of associations, from recruitment to the publication of events, all customizable by the user.

Moreover, the application will simplify the exchanges between the associations and the administration in order to allow the latter to obtain a simple vision of all the associations through statistics.

## Instalation Guide

Required software to run this application :
  - Node
  - Npm

You can find the exact Node version in `.nvmrc`

We recomand having Nx globaly installed :
```bash
npm install -g nx
```

Install the dependency :
```bash
npm ci
```

Running the project :
```bash
nx serve backend # Port: 3333
nx serve frontend-school # Port: 4200
nx serve frontend-association # Port: 4201
nx serve frontend-student
```

### PostgreSQL instalation

We are using PostgreSQL to manage our data.
We recomand using docker to install it.
```
docker-compose -f docker-compose.yml up -d database
```

Running the migration
```bash
npm run migration:run
```

### Install the precommit

It should be automaticly installed when running
```
npm ci
```

## Running the linter

You can run the linter using

```
nx affected:lint
```

## Running test

You can run the test using

```
nx affected:test
```
