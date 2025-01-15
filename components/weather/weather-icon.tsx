import Image from 'next/image';

interface PokemonSynergyProps {
  weather: string;
}

export function WeatherIcon(props: PokemonSynergyProps) {
  return (
    <Image
      src={`https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/refs/heads/master/app/public/src/assets/icons/weather/${props.weather}.svg`}
      alt={props.weather}
      width={25}
      height={25}
      className='invert opacity-50'
    />
  );
}
