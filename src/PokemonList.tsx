import {
  Badge,
  Grid,
  GridCol,
  Group,
  Image,
  Loader,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import { capitalize } from "./utils";
import { PokemonType } from "./type-colors";
import { useNavigate } from "react-router";
import { pokemonStore } from "./pokemon.store";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

export function PokemonListFC() {
  const { filteredPokemon, types, selectedType, loading } = pokemonStore;
  // const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  // const [types, setTypes] = useState<string[]>([]);
  // const [selectedType, setSelectedType] = useState<string | null>("");
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // const filteredPokemon = useMemo(() => {
  //   if (selectedType) {
  //     return pokemon.filter((poke) =>
  //       poke.types.some((t) => t.type.name === selectedType)
  //     );
  //   }
  //   return pokemon;
  // }, [pokemon, selectedType]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchAllFirstGenPokemon().then((pokemon) => {
  //     setPokemon(pokemon);

  //     const uniqueTypes = Array.from(
  //       new Set(
  //         pokemon.flatMap((poke) => poke.types.map((type) => type.type.name))
  //       )
  //     );
  //     setTypes(uniqueTypes);
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <>
      <Group pos="sticky" top={110} bg="var(--mantine-color-body)" p={15}>
        <Select
          placeholder="Select type"
          data={types
            .map((type) => ({ value: type, label: capitalize(type) }))
            .sort((a, b) => a.label.localeCompare(b.label))}
          value={selectedType}
          // onChange={setSelectedType}
          onChange={action((value) => {
            pokemonStore.selectedType = value;
          })}
        />
      </Group>
      {loading && <Loader mt="20%" mx="auto" size="xl" type="bars" />}
      <Grid>
        {filteredPokemon.map((poke) => (
          <GridCol span={3} key={poke.id}>
            <Stack
              miw={150}
              key={poke.id}
              gap="xs"
              align="center"
              p={10}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/${poke.id}`);
              }}
            >
              <Image
                h={100}
                w={100}
                src={poke.sprites.front_default}
                alt={poke.name}
              />
              <Title order={4}>{capitalize(poke.name)}</Title>
              <Group gap="xs">
                {poke.types.map((type) => (
                  <Badge
                    style={{
                      backgroundColor: PokemonType[type.type.name],
                    }}
                    key={type.slot}
                  >
                    {capitalize(type.type.name)}
                  </Badge>
                ))}
              </Group>
            </Stack>
          </GridCol>
        ))}
      </Grid>
    </>
  );
}

export const PokemonList = observer(PokemonListFC);

export default PokemonList;
