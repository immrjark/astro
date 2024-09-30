import { createSignal, For } from "solid-js";
import type { FavPokemons } from "src/interfaces/favPokemon";
import { FavPokemonsCard } from "./FavPokemonCard";

const getLocalStoragePokemon = (): FavPokemons[] => {
  // con esta función traigo los favs del LS
  const favPokemon = JSON.parse(localStorage.getItem("fav") ?? "[]");
  return favPokemon;
};

export const FavPokemon = () => {
  const [pokemons, setPokemons] = createSignal(getLocalStoragePokemon());
  return (
    <section class="grid grid-cols-2 sm:grid-cols-4">
      <For each={pokemons()}>
        {(pokemons) => <FavPokemonsCard pokemon={pokemons} />}
      </For>
    </section>
  );
};
