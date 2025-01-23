import type { PokemonType as PokemonTypeEnum } from "./type-colors";

export interface PokemonType {
  slot: number;
  type: {
    name: keyof typeof PokemonTypeEnum;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string;
  [key: string]: string | null;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
}
