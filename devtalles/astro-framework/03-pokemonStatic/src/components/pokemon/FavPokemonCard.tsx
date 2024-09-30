import { createSignal, Show, type Component } from "solid-js";
import type { FavPokemons } from "src/interfaces/favPokemon";

interface Props {
  pokemon: FavPokemons;
}
export const FavPokemonsCard: Component<Props> = (props) => {
  const { pokemon } = props;
  const [isVisible, setIsVisible] = createSignal(true);
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const removeFav = () => {
    const favorites = JSON.parse(
      localStorage.getItem("fav") ?? "[]"
    ) as FavPokemons[];

    const newFav = favorites.filter((pkm) => pkm.id !== pokemon.id);
    localStorage.setItem("fav", JSON.stringify(newFav));
    setIsVisible(false);
  };

  return (
    <Show when={isVisible()}>
      <section class="flex flex-col justify-center items-center text-center">
        <a href={`/pokemons/${pokemon.name}`}>
          <img
            src={imgSrc}
            alt={`Imagen de ${pokemon.name}`}
            style={`view-transition-name: ${pokemon.name}-image`}
          />
          <p class="capitalize text-xl">
            {pokemon.name} #{pokemon.id}
          </p>
        </a>
        <button onClick={removeFav} class="text-red-500 text-lg italic">
          Remove
        </button>
      </section>
    </Show>
  );
};
