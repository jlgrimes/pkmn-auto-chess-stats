'use client';

import { usePokemonMeta } from './pkmn-meta.hooks';

interface PokemonMetaSheetProps {
  pokemon: string;
}

export const PokemonMetaSheet = (props: PokemonMetaSheetProps) => {
  const { data, isLoading } = usePokemonMeta(props.pokemon);

  if (isLoading) return <div>loading</div>;

  return <div>{JSON.stringify(data)}</div>;
};
