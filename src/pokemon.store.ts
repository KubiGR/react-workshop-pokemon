import { action, makeAutoObservable } from "mobx";
import { fetchAllFirstGenPokemon } from "./poke.api";
import type { Pokemon } from "./pokemon.types";
import { capitalize } from "./utils";

export class PokemonStore {
  pokemons: Pokemon[];
  types: string[];
  selectedType: string | null;
  loading: boolean;

  constructor() {
    makeAutoObservable(this);

    this.pokemons = [];
    this.types = [];
    this.selectedType = "";

    this.loading = true;
    fetchAllFirstGenPokemon().then(
      action((pokemons) => {
        this.pokemons = pokemons;

        const uniqueTypes = Array.from(
          new Set(
            pokemons.flatMap((poke) => poke.types.map((type) => type.type.name))
          )
        );
        this.types = uniqueTypes;
        this.loading = false;
      })
    );
  }

  get filteredPokemon() {
    return this.pokemons.filter((poke) => {
      if (!this.selectedType) return true;
      return poke.types.some((type) => type.type.name === this.selectedType);
    });
  }

  get selectedTypeOptions() {
    return this.types
      .map((type) => ({ value: type, label: capitalize(type) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }
}

export const pokemonStore = new PokemonStore();
