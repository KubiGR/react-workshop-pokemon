import type { Pokemon } from "./pokemon.types";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";
const FIRST_GEN_LIMIT = 151;
const BATCH_SIZE = 20;

async function fetchPokemonBatch(
  offset: number,
  limit: number
): Promise<Pokemon[]> {
  const response = await fetch(
    `${POKEMON_API_URL}?offset=${offset}&limit=${limit}`
  );
  const data = await response.json();
  return data.results;
}

export async function fetchAllFirstGenPokemon() {
  let allPokemon: Pokemon[] = [];
  for (let offset = 0; offset < FIRST_GEN_LIMIT; offset += BATCH_SIZE) {
    const batch = await fetchPokemonBatch(offset, BATCH_SIZE);
    const pokemonDetails = await Promise.all(
      batch.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
    );
    allPokemon = allPokemon.concat(pokemonDetails);
  }
  return allPokemon.filter((pokemon) => pokemon.id <= FIRST_GEN_LIMIT);
}

export async function fetchPokemonDetail(id: string): Promise<Pokemon> {
  const response = await fetch(`${POKEMON_API_URL}/${id}`);
  const data = await response.json();
  return data;
}
