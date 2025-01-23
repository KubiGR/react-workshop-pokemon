import { useEffect, useState } from "react";
import {
  Container,
  Image,
  Title,
  Group,
  Badge,
  Text,
  Stack,
  Loader,
} from "@mantine/core";
import { capitalize } from "./utils";
import { PokemonType } from "./type-colors";
import { Pokemon } from "./pokemon.types";
import { useParams } from "react-router";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

async function fetchPokemonDetail(id: string): Promise<Pokemon> {
  const response = await fetch(`${POKEMON_API_URL}/${id}`);
  const data = await response.json();
  return data;
}

function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchPokemonDetail(id!).then((data) => setPokemon(data));
  }, [id]);

  if (!pokemon) {
    return <Loader mt="20%" mx="auto" size="xl" type="bars" />;
  }

  return (
    <Container>
      <Stack align="center" gap="md">
        <Image
          h={200}
          w={200}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <Title order={2}>{capitalize(pokemon.name)}</Title>
        <Group gap="xs">
          {pokemon.types.map((type) => (
            <Badge
              style={{
                backgroundColor:
                  PokemonType[type.type.name as keyof typeof PokemonType],
              }}
              key={type.slot}
            >
              {capitalize(type.type.name)}
            </Badge>
          ))}
        </Group>
        <Text>Height: {pokemon.height}</Text>
        <Text>Weight: {pokemon.weight}</Text>
        <Text>Base Experience: {pokemon.base_experience}</Text>
        <Group gap="xs">
          {pokemon.abilities.map((ability) => (
            <Badge key={ability.slot}>{capitalize(ability.ability.name)}</Badge>
          ))}
        </Group>
      </Stack>
    </Container>
  );
}

export default PokemonDetail;
