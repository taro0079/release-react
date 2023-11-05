import { useEffect, useState } from 'react'
import LoadingText from '../LoadingText/LoadingText'

export type PokemonResponse = {
  sprites: {
    front_default: string
    back_default: string
  }
  name: string
}

const getPokemon = async () => {
  const randomNumber = Math.floor(Math.random() * 150) + 1
  const url = 'https://pokeapi.co/api/v2/pokemon/' + randomNumber
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Request Failed')
  }

  const data = await response.json()
  return data as PokemonResponse
}

const PokeLoad = () => {
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemon()
      setPokemon(data)
    }
    fetchPokemon()
  }, [])

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
export default PokeLoad
