'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PokemonTableEntry } from './pkmn-table.types';
import Image from 'next/image';

export const columns: ColumnDef<PokemonTableEntry>[] = [
  {
    accessorKey: 'index',
    header: 'Dex',
    cell: ({ row }) => (
      <Image
        src={`https://raw.githubusercontent.com/keldaanCommunity/SpriteCollab/master/portrait/${row.getValue(
          'index'
        )}/Normal.png`}
        alt={row.getValue('name')}
        width={40}
        height={40}
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'tier',
    header: 'Tier',
    cell: ({ row }) => (
      <div className='flex'>
        {[...Array.from(Array(row.getValue('tier')))].map((_, idx) => (
          <Image
            key={`${row.getValue('index')}-star-${idx}`}
            src={`https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/c2b4974c4b1807c24c62020b0de7e5f9db532b1f/app/public/src/assets/ui/star.svg`}
            alt='star'
            width={16}
            height={16}
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'types',
    header: 'Types',
    cell: ({ row }) => (
      <div className='flex'>
        {(row.getValue('types') as string[]).map(type => (
          <Image
            key={`${row.getValue('index')}-type-${type}`}
            src={`https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/refs/heads/master/app/public/src/assets/types/${type}.svg`}
            alt={type}
            width={32}
            height={32}
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'hp',
    header: 'HP',
  },
  {
    accessorKey: 'attack',
    header: 'Attack',
  },
  {
    accessorKey: 'defense',
    header: 'Defense',
  },
  {
    accessorKey: 'specialDefense',
    header: 'Sp. Def',
  },
];
