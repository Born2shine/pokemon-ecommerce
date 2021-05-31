/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DetailsLayout, Prev, Next } from "./components/DetailsLayout";
import { ImageSection } from "./components/ImageSection";
import { ThumbnailSection } from "./components/ThumbnailSection";
import { MetaSection } from "./components/MetaSection";
import useData from "../Hooks/useFetchData"
import Loader from "../Loader/Loader"
import { GrPrevious, GrNext } from "react-icons/gr"

const CrossSellingSection = styled.div`
  grid-area: crossselling;
  margin-top: 24px;
  width: 100%;
  height: 50px;
`;
const NavigationButton = styled.div`
  position: initial
`;

export function Details() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [pokemonID, setPokemonID] = useState(id);
  const [isValidPokemonID, setValidPokemonID] = useState(true);
  const { data, isLoading } = useData(pokemonID);
  let newPokemonID = parseInt(pokemonID);
  
  const switchDetailHandler = (handler) => (handler === 'next') ? setPokemonID(++newPokemonID) : setPokemonID(--newPokemonID)
  
  useEffect(() => {
    const newID = newPokemonID + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${newID}`)
    .then((res) => {
      if(res.status === 404){
        setValidPokemonID(false)
      }else{
        setValidPokemonID(true)
      }
    })
  }, [newPokemonID])

  return ( 
    <>
    {isLoading && (<Loader/>)}
    { data &&
    <DetailsLayout>
      <ImageSection
        alt={data.name}
        src={
          selectedImage || data.sprites.other["official-artwork"].front_default
        }
      />
      <ThumbnailSection
        name={data.name}
        selectedImage={selectedImage}
        handleMouseEnter={(e) => setSelectedImage(e.target.src)}
        thumbnailOneSrc={data.sprites.other["official-artwork"].front_default}
        thumbnailTwoSrc={data.sprites.other.dream_world.front_default}
        thumbnailThreeSrc={data.sprites.front_default}
        thumbnailFourSrc={data.sprites.back_default}
      />

      <MetaSection
        type={data.types[0].type.name}
        name={data.name}
        price={data.base_experience}
        stats={data.stats}
        abilities={data.abilities}
      />

      <CrossSellingSection>
        {/* Exercise: Add cards with more pokemon */}
      </CrossSellingSection>

      <NavigationButton>
       {newPokemonID !== 1 && (
         <Prev onClick={() => switchDetailHandler('prev')}> <GrPrevious/> </Prev>
       )}
        {isValidPokemonID &&
          <Next onClick={() => switchDetailHandler('next')}> <GrNext/> </Next>
        }
      </NavigationButton>
    </DetailsLayout>
  }
  </>
  );
}
