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
import { PokemonTableEntry } from './pkmn-table.types';
import { useMemo } from 'react';
import { SortHeaderButton } from './sort-header-button';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PokemonTableContentCell } from './pkmn.table.cell-content';

interface PokemonTableProps {
  data: PokemonTableEntry[];
  columns: ColumnDef<PokemonTableEntry>[];
}

export function PokemonTable(props: PokemonTableProps) {
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  <PokemonTableContentCell cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={props.columns.length}
              className='h-24 text-center'
            >
              No results.
            </TableCell>
          </TableRow>
        )}
        {/* {sortedPokemon.map(pkmn => (
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
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
}
