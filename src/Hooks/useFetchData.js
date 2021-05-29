import {useState, useEffect} from 'react'

const useData = (id) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((res) => res.json())
          .then((pokemonData) => {
            Promise.all(pokemonData.abilities.map((a) => fetch(a.ability.url)))
              .then((responses) => Promise.all(responses.map((res) => res.json())))
              .then((abilityData) =>
                setData({ ...pokemonData, abilities: abilityData })
              );
          });
      }, [id]);

      return { data }
}

export default useData;