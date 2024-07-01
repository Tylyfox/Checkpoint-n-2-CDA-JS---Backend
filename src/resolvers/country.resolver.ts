import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country, CountryCreateInput } from "../entities/country.entity";
import CountryServices from "../services/countries.services";

@Resolver()
export class CountryResolver {
    @Query(() => [Country])
    async listCountries() {
        const countries: Country[] = await new CountryServices().list();
        return countries;
    }

    @Query(() => Country)
    async findCountryByCode(@Arg("code", () => String) code: string) {
        const country = await new CountryServices().findByCode(code);
        return country;
    }

    @Query(() => [Country])
    async findCountriesByContinentCode(@Arg("continentCode", () => String) continentCode: string) {
        const countries = await new CountryServices().findByContinentCode(continentCode);
        return countries;
    }

    @Mutation(() => Country)
    async createCountry(@Arg("data") data: CountryCreateInput) {
        const result: Country = await new CountryServices().create(data);
        return result;
    }
}
