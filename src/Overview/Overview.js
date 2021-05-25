import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import { PokemonCard } from "../common/PokemonCard"

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
  padding: 25px 300px;
  grid-template-columns: auto;
  grid-gap: 1rem;
`;

const CardsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 340px);
  grid-gap: 1rem;
  justify-content: center;
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto 100px;
  grid-gap: 1rem;
  justify-content: center;
`;

const Filter = styled.input`
  font-size: 23px;
`;

const Select = styled.select`
  font-size: 15px
`;

export function Overview({ data }) {
  // console.log('DATA in overview', data);
  const history = useHistory();
  const [filter, setFilter] = useState({
    filterData: '',
    sortingData: ''
  });

  const filteredPokemons = useMemo(() => {
     const filtered = data.filter((pokemon) => {
      return pokemon.name.includes(filter.filterData.toLowerCase())
    })
    let sort = filter.sortingData;
    if (sort) {
      if(sort === 'ASC'){
        return filtered.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      }else if(sort === 'DSC'){
        return  filtered.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse()
      }else{
         return filtered
      }
    }
    return filtered
  }, [filter, data])

  const handleCardClick = (id) => {
    history.push(`/${id}`);
  }

  const handleFilterChange = (e) => {
    setFilter({...filter, filterData: e.target.value});
  }

  const handleSorting = (e) => {
    setFilter({...filter, sortingData: e.target.value})
  }

  return (
    <Container>
      <FiltersContainer>
        <Filter
          type="text"
          placeholder="Filter pokemons here"
          value={filter.filterData}
          onChange={handleFilterChange}
        />
        <Select onChange={handleSorting} value={filter.sortingData}>
          <option value="No sort">No Sorting</option>
          <option value="ASC">Ascending</option>
          <option value="DSC">Descending</option>
        </Select>
      </FiltersContainer>
      <CardsWrapper>
        {
          filteredPokemons.map(({ name, url, price }) => (
            <PokemonCard
              key={name}
              name={name}
              price={price}
              image={`https://pokeres.bastionbot.org/images/pokemon/${
                url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
              }.png`}
              click={() => handleCardClick(url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''))}
            />
          ))
        }
      </CardsWrapper>
    </Container>
  );
}
