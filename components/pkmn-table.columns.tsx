'use client';

import { ColumnDef } from '@tanstack/react-table';

import { PokemonTableEntry } from './pkmn-table.types';
import Image from 'next/image';
import { SortHeaderButton } from './sort-header-button';

export const columns: ColumnDef<PokemonTableEntry>[] = [
  {
    accessorKey: 'index',
    header: ({ column }) => <SortHeaderButton column={column} header='Dex' />,
    size: 40,
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
    header: ({ column }) => <SortHeaderButton column={column} header='Name' />,
  },
  {
    accessorKey: 'tier',
    header: ({ column }) => <SortHeaderButton column={column} header='Tier' />,
    size: 50,
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
    size: 100,
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
    size: 20,
    header: ({ column }) => <SortHeaderButton column={column} header='HP' />,
  },
  {
    accessorKey: 'attack',
    size: 20,
    header: ({ column }) => (
      <SortHeaderButton column={column} header='Attack' />
    ),
  },
  {
    accessorKey: 'defense',
    size: 20,
    header: ({ column }) => <SortHeaderButton column={column} header='Def' />,
  },
  {
    accessorKey: 'specialDefense',
    size: 20,
    header: ({ column }) => (
      <SortHeaderButton column={column} header='Sp. Def' />
    ),
  },
];
