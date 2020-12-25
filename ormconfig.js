const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

module.exports = [
  {
    name: "development",
    type: "better-sqlite3",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || "test_user",
    password: process.env.DB_PASSWORD || "test_pw",
    database: process.env.DB_NAME || "db.sqlite",
    synchronize: true,
    logging: true,
    entities: ["src/interface/gateway/entity/**/*.ts"],
    namingStrategy: new SnakeNamingStrategy(),
  },
  {
    name: "production",
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || "test",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_NAME || "test",
    synchronize: false,
    logging: false,
    entities: ["dist/interface/gateway/entity/**/*.js"],
    namingStrategy: new SnakeNamingStrategy(),
  },
];
