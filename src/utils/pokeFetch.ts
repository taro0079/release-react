type PokemonResponse = {
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

export default getPokemon
