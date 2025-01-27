import { Sequelize } from "sequelize";
import { option } from "../../database/config/config.mjs";
import type { SequelizeOptions } from "sequelize-typescript";
import pg from "pg";

const dbOptions = option as SequelizeOptions;
dbOptions.dialectModule = pg;
const sequelize = new Sequelize(dbOptions);
export default sequelize;
