export const option = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,

    // migration storage
    migrationStorageTableName: "migrations",

    // logging
    logging: process.env.NODE_ENV === "development" ? console.log : false,
}


if (process.env.NODE_ENV === "production") {
    const options = new URL(process.env.DB_URL);

    option.dialectOptions = {
        ssl: { rejectUnauthorized: true }
    }
}

export default {
    development: option,
    production: option,
    test: option
}