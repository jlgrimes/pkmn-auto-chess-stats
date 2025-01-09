'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { PkmnTableSort, Pokemon } from './pkmn-table.types';
import { useMemo, useState } from 'react';
import { SortHeaderButton } from './sort-header-button';

interface PokemonTableProps {
  pokemon: Pokemon[];
}

export function PokemonTable(props: PokemonTableProps) {
  const [sort, setSort] = useState<PkmnTableSort>({
    by: 'index',
    order: 'asc',
  });

  const sortedPokemon = useMemo(() => {
    return props.pokemon.sort((a, b) => {
      const isAscending = a[sort.by] < b[sort.by];
      const isDescending = a[sort.by] > b[sort.by];

      if (sort.order === 'asc') {
        if (isAscending) return -1;
        if (isDescending) return 1;
      }

      if (sort.order === 'desc') {
        if (isAscending) return 1;
        if (isDescending) return -1;
      }

      return 0;
    });
  }, [props.pokemon, sort]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px]'>
            <SortHeaderButton type='index' {...{ sort, setSort }} />
          </TableHead>
          <TableHead>
            <SortHeaderButton type='name' {...{ sort, setSort }} />
          </TableHead>
          <TableHead>
            <SortHeaderButton type='tier' {...{ sort, setSort }} />
          </TableHead>
          <TableHead>Type</TableHead>
          <TableHead className='text-right'>
            <SortHeaderButton type='hp' {...{ sort, setSort }} />
          </TableHead>
          <TableHead className='text-right'>
            <SortHeaderButton type='attack' {...{ sort, setSort }} />
          </TableHead>
          <TableHead className='text-right'>
            <SortHeaderButton type='defense' {...{ sort, setSort }} />
          </TableHead>
          <TableHead className='text-right'>
            <SortHeaderButton type='specialDefense' {...{ sort, setSort }} />
          </TableHead>
          <TableHead className='text-right'>
            <SortHeaderButton type='bst' {...{ sort, setSort }} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPokemon.map(pkmn => (
          <TableRow key={pkmn.index}>
            <TableCell>
              <Image
                src={`https://raw.githubusercontent.com/keldaanCommunity/SpriteCollab/master/portrait/${pkmn.index}/Normal.png`}
                alt={pkmn.name}
                width={40}
                height={40}
              />
            </TableCell>
            <TableCell>{pkmn.name}</TableCell>
            <TableCell>
              <div className='flex'>
                {[...Array.from(Array(pkmn.tier))].map((_, idx) => (
                  <Image
                    key={`${pkmn.index}-star-${idx}`}
                    src={`https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/c2b4974c4b1807c24c62020b0de7e5f9db532b1f/app/public/src/assets/ui/star.svg`}
                    alt='star'
                    width={16}
                    height={16}
                  />
                ))}
              </div>
            </TableCell>
            <TableCell className='flex'>
              {[pkmn.type1, pkmn.type2, pkmn.type3, pkmn.type4].map(
                type =>
                  type.length > 1 && (
                    <Image
                      key={`${pkmn.index}-type-${type}`}
                      src={`https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/refs/heads/master/app/public/src/assets/types/${type}.svg`}
                      alt={pkmn.name}
                      width={32}
                      height={32}
                    />
                  )
              )}
            </TableCell>
            <TableCell className='text-right'>{pkmn.hp}</TableCell>
            <TableCell className='text-right'>{pkmn.attack}</TableCell>
            <TableCell className='text-right'>{pkmn.defense}</TableCell>
            <TableCell className='text-right'>{pkmn.specialDefense}</TableCell>
            <TableCell className='text-right'>{pkmn.bst}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
