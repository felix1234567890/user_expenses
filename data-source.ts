import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "frane",
  database: "healthpoints",
  entities: ["./src/models/*.ts"],
  migrations: ["./src/migrations/*.ts"],
  synchronize: true,
});
