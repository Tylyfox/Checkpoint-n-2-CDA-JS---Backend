import { Country, CountryCreateInput } from "../entities/country.entity";
import { Continent } from "../entities/continent.entity";
import datasource from "../lib/datasource";
import { Repository } from "typeorm";

class CountryServices {
    db: Repository<Country>;
    continentRepo: Repository<Continent>;

    constructor() {
        this.db = datasource.getRepository(Country);
        this.continentRepo = datasource.getRepository(Continent);
    }

    async list() {
        return await this.db.find({ relations: ["continent"] });
    }

    async findByCode(code: string) {
        const findCode = await this.db.findOne({
            where: { code: code },
            relations: ["continent"]
        });
    
        if (!findCode) {
            return null;
        }
        return findCode;
    }

    async findByContinentCode(continentCode: string) {
        const continent = await this.continentRepo.findOne({ where: { code: continentCode }, relations: ["countries"] });
        return continent ? continent.countries : [];
    }

    async create(data: CountryCreateInput) {
        const continent = await this.continentRepo.findOne({ where: { code: data.continentCode } });
        if (!continent) {
            throw new Error("Continent not found");
        }

        const newCountry = this.db.create({
            ...data,
            code: data.code.toUpperCase(),
            continent: continent
        });
        return await this.db.save(newCountry);
    }
}

export default CountryServices;
