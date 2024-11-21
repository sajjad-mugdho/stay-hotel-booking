"use client";
import { useEffect, useState, useCallback } from "react";
import Container from "./Container";
import qs from "query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button as Button2 } from "./ui/button-2";
import useLocation from "@/hooks/useLocation";
import { ICity, IState } from "country-state-city";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash"; // To debounce the router push

type Props = {};

const LocationFilter = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const { getAllCountries, getCountryStates, getStateCitys } = useLocation();

  const countries = getAllCountries();
  // const states = getCountryStates(country);
  // const cities = getStateCitys(state);

  useEffect(() => {
    if (country) {
      setStates(getCountryStates(country));
      setState("");
      setCity("");
    }
  }, [country]);
  useEffect(() => {
    const citiesState = getStateCitys(country, state);
    if (citiesState) {
      setCities(citiesState);
      setCity("");
    }
  }, [country, state]);

  useEffect(() => {
    if (country === "" && state === "" && city === "") return router.push("/");

    let currentQuery: any = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    if (country) {
      currentQuery = {
        ...currentQuery,
        country,
      };
    }
    if (state) {
      currentQuery = {
        ...currentQuery,
        state,
      };
    }
    if (city) {
      currentQuery = {
        ...currentQuery,
        city,
      };
    }

    if (state === "" && currentQuery.state) {
      delete currentQuery.state;
    }
    if (city === "" && currentQuery.city) {
      delete currentQuery.city;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: currentQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [country, state, city]);

  const handleClear = () => {
    router.push("/");
    setCountry("");
    setState("");
    setCity("");
  };
  const isHomePage = pathname === "/";
  return (
    <>
      {isHomePage && (
        <Container>
          <div className="flex gap-2 md:gap-4 items-center justify-center text-sm">
            {/* Country Dropdown */}
            <div>
              <Select
                onValueChange={(value) => setCountry(value)}
                value={country}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* State Dropdown */}
            <div>
              <Select onValueChange={(value) => setState(value)} value={state}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {states.length > 0 &&
                    states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Dropdown */}
            <div>
              <Select onValueChange={(value) => setCity(value)} value={city}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.length > 0 &&
                    cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filter Button */}
            <Button2 onClick={handleClear} variant="outline">
              Clear Filter
            </Button2>
          </div>
        </Container>
      )}
    </>
  );
};

export default LocationFilter;
