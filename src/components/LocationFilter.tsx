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
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash"; // To debounce the router push

type Props = {};

const LocationFilter = (props: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  // States for storing selected country, state, city, and their corresponding lists
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  // Hook to fetch countries, states, and cities
  const { getAllCountries, getCountryStates, getStateCitys } = useLocation();
  const countries = getAllCountries();

  // Fetch states whenever the country changes
  useEffect(() => {
    if (country) {
      setStates(getCountryStates(country));
      setState(""); // Reset state and city when country changes
      setCity("");
    }
  }, [country]);

  // Fetch cities whenever the country or state changes
  useEffect(() => {
    if (country && state) {
      setCities(getStateCitys(country, state));
      setCity(""); // Reset city when state changes
    }
  }, [country, state]);

  // Debounced function for updating the query params and pushing the URL
  const updateQueryParams = useCallback(
    debounce((updatedParams: any) => {
      const url = qs.stringifyUrl(
        { url: "/", query: updatedParams },
        { skipEmptyString: true, skipNull: true }
      );
      router.push(url); // Push the URL only after debounce delay
    }, 500), // 500ms delay for debouncing
    [router]
  );

  // Effect to update query params whenever country, state, or city changes
  useEffect(() => {
    if (country === "" && state === "" && city === "") {
      return router.push("/"); // Clear filters and go back to root
    }

    let currentQuery: any = { ...qs.parse(params.toString()) };

    // Update the query object with non-empty values
    if (country) currentQuery.country = country;
    if (state) currentQuery.state = state;
    if (city) currentQuery.city = city;

    if (state === "" && currentQuery.state) delete currentQuery.state;
    if (city === "" && currentQuery.city) delete currentQuery.city;

    // Call the debounced function to update URL
    updateQueryParams(currentQuery);
  }, [country, state, city, params, router, updateQueryParams]);

  // Clear all filters
  const handleClear = () => {
    setCountry("");
    setState("");
    setCity("");
    router.push("/"); // Navigate back to root
  };

  return (
    <Container>
      <div className="flex gap-2 md:gap-4 items-center justify-center text-sm">
        {/* Country Dropdown */}
        <div>
          <Select onValueChange={(value) => setCountry(value)} value={country}>
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
  );
};

export default LocationFilter;
