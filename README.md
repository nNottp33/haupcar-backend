# Haupcar Backend

REST API for managing company car records (license plate, brand, model, notes). Built with NestJS, Prisma, and PostgreSQL.

## Stack

- NestJS 11 (REST)
- Prisma 7 + PostgreSQL (via `@prisma/adapter-pg`)
- pnpm

## Prerequisites

- Node.js 22
- pnpm
- Docker (for PostgreSQL, or a local Postgres instance)

## Setup

```bash
pnpm install
cp .env.example .env
```

Adjust `.env` if needed. Defaults assume a local Postgres on `localhost:5432`.

## Run a local database

```bash
docker compose up -d db
```

## Run migrations

```bash
pnpm exec prisma migrate dev
```

## Development

```bash
pnpm start:dev
```

API runs at `http://localhost:3000/api`. Swagger docs at `http://localhost:3000/api/docs`.

## Tests

```bash
pnpm test        # unit tests
pnpm test:e2e    # e2e tests (requires the database running and migrated)
```

## Build

```bash
pnpm build
```

## Run with Docker

`docker-compose.yml` runs the database and the API. Container env vars are read from `.env` — set `DATABASE_URL` host to `db` (the compose service name) instead of `localhost`:

```bash
cp .env.example .env
# in .env: DATABASE_URL=postgresql://postgres:postgres@db:5432/haupcar?schema=public
docker compose up --build
```

- API: `http://localhost:3000/api`

The frontend has its own Docker setup — see the `haupcar-frontend` repo.

## API Endpoints

| Method | Path            | Description     |
| ------ | --------------- | --------------- |
| POST   | `/api/cars`     | Create a car    |
| GET    | `/api/cars`     | List all cars   |
| GET    | `/api/cars/:id` | Get a car by id |
| PATCH  | `/api/cars/:id` | Update a car    |
| DELETE | `/api/cars/:id` | Delete a car    |
