import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from 'axios';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    if (!inputValue.trim()) {
      return { options: [] };
    }
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_GEO_API_URL}/v1/geo/cities?namePrefix=${inputValue}`,
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_GEO_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_GEO_API_HOST,
        },
      });
      return {
        options: response.data.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
            lat: city.latitude,
            lon: city.longitude,
            countryCode: city.countryCode,
          };
        }),
      };
    } catch (error) {
      console.error(error);
      return { options: [] };
    }
  };

  return (
    <AsyncPaginate
      placeholder='Search for city'
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
