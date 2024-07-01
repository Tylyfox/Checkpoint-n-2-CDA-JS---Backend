import { DataSource } from "typeorm";
import { Country }  from "../entities/country.entity";
import { Continent } from "../entities/continent.entity";

export default new DataSource({
  type: "sqlite",
  database: "checkpoint2.sqlite",
  entities: [Country, Continent],
  synchronize: true,
  logging: ["error", "query"],
});
