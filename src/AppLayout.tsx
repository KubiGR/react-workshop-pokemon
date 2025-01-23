import { Container, Group, Image } from "@mantine/core";
import { Link, Outlet } from "react-router";

export function AppLayout() {
  return (
    <Container p={10}>
      <Group h={110} bg="var(--mantine-color-body)" pos="sticky" top={0}>
        <Link to="/">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            w={200}
          />
        </Link>
      </Group>
      <Outlet />
    </Container>
  );
}
