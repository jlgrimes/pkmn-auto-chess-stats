import Image from 'next/image';

interface PokemonSynergyProps {
  type: string;
}

export function PokemonSynergy(props: PokemonSynergyProps) {
  return (
    <Image
      src={`https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/refs/heads/master/app/public/src/assets/types/${props.type}.svg`}
      alt={props.type}
      width={32}
      height={32}
    />
  );
}
