import { Country, CountryCreateInput } from "../entities/country.entity";
import datasource from "../lib/datasource";
import { Repository } from "typeorm";

class CountryServices {

    db: Repository<Country>;

    constructor() {
        this.db = datasource.getRepository(Country);
    }

    async list() {
        return await this.db.find();
    }

    async findByCode(code: string) {
        const findCode = await this.db.findOne({
            where: { code: code }
          });
      
          if (!findCode) {
            return null;
          }
          return findCode;
    }
    
    async create(data: CountryCreateInput) {
        data.code.toUpperCase();
        const newCountry = this.db.create(data);
        return await this.db.save(newCountry);
    }

    async findByContinentCode(continentCode: string) {
        return await this.db.find({
            where: { continentCode: continentCode }
        });
    }
}

export default CountryServices;