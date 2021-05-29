import {useState, useEffect} from 'react'

const useData = (id) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((res) => res.json())
          .then((pokemonData) => {
            Promise.all(pokemonData.abilities.map((a) => fetch(a.ability.url)))
              .then((responses) => Promise.all(responses.map((res) => res.json())))
              .then((abilityData) =>
               {
                setData({ ...pokemonData, abilities: abilityData })
                setLoading(false)
               }
              );
          });
      }, [id]);

      return { data, isLoading }
}

export default useData;