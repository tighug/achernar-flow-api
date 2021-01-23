FROM node:14-buster-slim  AS builder
WORKDIR /app
COPY src/ ./src/
COPY prisma/ ./prisma/ 
COPY *.json ./
RUN yarn install \
    && yarn build \
    && yarn install --prod

FROM node:14-buster-slim AS production
WORKDIR /app
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/prisma/ ./prisma/
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/package.json .
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/*
EXPOSE 8000
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["yarn start"]
