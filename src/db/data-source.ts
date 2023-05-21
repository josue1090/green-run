import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_URL,
  port: parseInt(String(process.env.DATABASE_PORT)),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ["./src/api/**/entities/*.entity.ts"],
  migrations: [__dirname + "/migrations/*.{t,j}s"],
  synchronize: false,
});

export default AppDataSource;
