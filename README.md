# achernar-flow-api

## Installation

```bash
docker pull tighug/achernar-flow-api
```

### Environment variables

- `API_PORT`: API port
- `DB_URL`: Database URL used on Prisma
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port

## Contributing

Please open issues and pull requests for new features, questions, and bug fixes.

### Requirements

- `yarn v1.22.10`

### Get started

```bash
# 1. Clone this repository
git clone https://github.com/tighug/achernar-flow-api.git

# 2. Install dependencies
yarn install

# 3. Copy .env.example to .env
cp .env.example .env

# 4. Initialize @prisma/client
yarn generate

# 5. Serve in development mode
yarn dev

# Serve in production mode
yarn start
```

## License

[MIT](./LICENSE)
