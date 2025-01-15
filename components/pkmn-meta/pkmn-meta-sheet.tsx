'use client';

import Image from 'next/image';
import { usePokemonMeta } from '../../lib/hooks/pkmn-meta.hooks';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface PokemonMetaSheetProps {
  pokemon: string;
}

export const PokemonMetaSheet = (props: PokemonMetaSheetProps) => {
  const { data, isLoading } = usePokemonMeta(props.pokemon);

  if (isLoading) return <div>loading</div>;

  if (props.pokemon.length === 0) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tier</TableHead>
          <TableHead># Used</TableHead>
          <TableHead>Avg. Rank</TableHead>
          <TableHead>Most Common Items</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.reverse()?.map(tier => (
          <TableRow key={`${props.pokemon}-tier-row-${tier}`}>
            <TableCell>
              <Image
                height={30}
                width={30}
                src={`https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/ab58939ad259ea8434557a6766576760a8d4ca5a/app/public/src/assets/ranks/${tier.tier}.svg`}
                alt={tier.tier}
              />
            </TableCell>
            <TableCell>{tier.pokemon?.count}</TableCell>
            <TableCell>{tier.pokemon?.rank}</TableCell>
            <TableCell>
              <div className='flex space-x-1'>
                {tier.pokemon?.items.map(item => (
                  <Image
                    key={tier.tier + item}
                    height={30}
                    width={30}
                    src={`https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/ab58939ad259ea8434557a6766576760a8d4ca5a/app/public/src/assets/item%7Btps%7D/${item}.png`}
                    alt={item}
                  />
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
