'use client';

import useSWR from 'swr';

type ResponseSchema = {
  tier: string;
  pokemons: Record<
    string,
    {
      items: string[];
      rank: number;
      count: number;
      name: string;
      item_count: number;
    }
  >;
}[];

export const usePokemonMeta = (pokemonName: string) => {
  const { data, isLoading } = useSWR(['pkmn-meta'], () =>
    fetch('https://www.pokemon-auto-chess.com/meta/pokemons').then(res =>
      res.json()
    )
  );
  console.log(data);

  return {
    data: (data as ResponseSchema | undefined)?.map(tierObj => ({
      tier: tierObj.tier,
      pokemon: Object.entries(tierObj.pokemons).find(
        ([name]) => name === pokemonName.toUpperCase()
      ),
    })),
    isLoading,
  };
};
