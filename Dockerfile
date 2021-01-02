ARG NODE_VERSION=14
FROM node:${NODE_VERSION}-buster-slim AS development
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    exa \
    git \
    vim \
    zsh \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/*
RUN curl -sSfLO https://github.com/sharkdp/bat/releases/download/v0.17.1/bat_0.17.1_amd64.deb \
    && dpkg -i bat_0.17.1_amd64.deb \
    && rm bat_0.17.1_amd64.deb
RUN curl -sSfL https://starship.rs/install.sh | bash -s - -y

FROM development AS builder
WORKDIR /app
COPY src/ ./src/
COPY prisma/ ./prisma/ 
COPY *.json .env ./
RUN yarn install \
    && yarn build \
    && yarn install --prod

FROM node:${NODE_VERSION}-buster-slim AS production
WORKDIR /app
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/prisma/ ./prisma/
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/package.json .
COPY --from=builder /app/.env .
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/*
EXPOSE 8000
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["yarn start"]
