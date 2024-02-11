import { count } from "console";
import { Country, State, City } from "country-state-city";
import { getAllStates } from "country-state-city/lib/state";
import { stat } from "fs";

const useLocation = () => {
  const getCountryByCode = (countryCode: string) => {
    return Country.getAllCountries().find(
      (country) => country.isoCode === countryCode
    );
  };
  const getStateByCode = (CountryCode: string, stateCode?: string) => {
    const states = State.getAllStates().find(
      (state) =>
        state.countryCode === CountryCode && state.isoCode === stateCode
    );

    if (!states) return null;
    return states;
  };

  const getCountryStates = (countryCode: string) => {
    return State.getStatesOfCountry(countryCode).filter(
      (state) => state.countryCode === countryCode
    );
  };

  const getStateCitys = (countryCode: string, stateCode?: string) => {
    return City.getAllCities().filter(
      (city) => city.countryCode === countryCode && city.stateCode === stateCode
    );
  };

  return {
    getAllCountries: Country.getAllCountries,
    getCountryByCode,
    getStateByCode,
    getCountryStates,
    getStateCitys,
  };
};

export default useLocation;
