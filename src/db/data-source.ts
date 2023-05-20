import { DataSource } from "typeorm";

const AppDataSource = (envs: any) =>
  new DataSource({
    type: "mysql",
    host: envs.DATABASE_URL,
    port: parseInt(String(envs.DATABASE_PORT)),
    username: envs.DATABASE_USERNAME,
    password: envs.DATABASE_PASSWORD,
    database: envs.DATABASE_NAME,
    entities: ["./src/api/**/entities/*.entity.ts"],
    synchronize: false,
  });

export default AppDataSource;
