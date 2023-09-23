import React from "react"
import { PokemonResponse } from "../../types"
import LoadingText from "../LoadingText/LoadingText"

type pokeLoaderProps = {
    pokemon: PokemonResponse
}
const PokeLoader:React.FC<pokeLoaderProps> = ({pokemon}) => {
  return (
    <div className="pokeload">
      <div className="poke-loader">
        <div style={{ height: '200px' }}>
          {pokemon && (
            <img src={pokemon.sprites.front_default} width="200px" />
          )}
        </div>
        <LoadingText />
      </div>
    </div>
  )


}

export default PokeLoader
