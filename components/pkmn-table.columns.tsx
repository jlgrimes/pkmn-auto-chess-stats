'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PokemonTableEntry } from './pkmn-table.types';

export const columns: ColumnDef<PokemonTableEntry>[] = [
  {
    accessorKey: 'index',
    header: 'Dex',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'tier',
    header: 'Tier',
  },
  {
    accessorKey: 'types',
    header: 'Types',
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
