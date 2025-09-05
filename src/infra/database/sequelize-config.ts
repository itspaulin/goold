import { Sequelize } from "sequelize-typescript";
import path from "path";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "mysql_user",
  password: process.env.DB_PASSWORD || "mysql_pass",
  database: process.env.DB_NAME || "appointment_system",
  models: [path.join(__dirname, "models", "*.ts")],
  logging: process.env.NODE_ENV !== "production",
});

export default sequelize;
