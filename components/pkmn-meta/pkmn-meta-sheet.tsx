'use client';

import Image from 'next/image';
import { usePokemonMeta } from './pkmn-meta.hooks';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

interface PokemonMetaSheetProps {
  pokemon: string;
}

export const PokemonMetaSheet = (props: PokemonMetaSheetProps) => {
  const { data, isLoading } = usePokemonMeta(props.pokemon);

  if (isLoading) return <div>loading</div>;

  return (
    <Table>
      <TableBody>
        {data?.map(tier => (
          <TableRow>
            <TableCell>
              <Image
                height={30}
                width={30}
                src={`https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/ab58939ad259ea8434557a6766576760a8d4ca5a/app/public/src/assets/ranks/${tier.tier}.svg`}
                alt={tier.tier}
              />
            </TableCell>
            <TableCell>
              <div className='flex space-x-1'>
                {tier.pokemon?.items.map(item => (
                  <Image
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
