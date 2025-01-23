import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PokemonList from "./PokemonList.tsx";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { AppLayout } from "./AppLayout.tsx";
import PokemonDetail from "./PokemonDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<PokemonList />} />
            <Route path=":id" element={<PokemonDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
