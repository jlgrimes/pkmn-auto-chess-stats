'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PokemonTableEntry } from './pkmn-table.types';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { capitalizeString } from '@/lib/utils';
import { PokemonSynergy } from './pkmn-synergy';
import { Settings2 } from 'lucide-react';

interface PokemonTableProps {
  data: PokemonTableEntry[];
  columns: ColumnDef<PokemonTableEntry>[];
  synergies: string[];
}

export function PokemonTable(props: PokemonTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        maxTier: false,
      },
    },
  });

  const { rows } = table.getRowModel();

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 43,
    overscan: 20,
  });

  const getSynergyIsChecked = useCallback((synergy: string) => {
    return (
      table.getColumn('types')?.getFilterValue() as string[] | undefined
    )?.includes(synergy);
  }, []);

  return (
    <div className='w-full'>
      <div className='flex items-center py-4 space-x-4'>
        <Input
          placeholder='Search Pokemon'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger className='flex gap-x-2 items-center '>
            <Settings2 className='w-4 h-4' />
            Filter
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Types</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className='h-[200px] overflow-scroll'>
              {props.synergies
                .sort((a, b) => {
                  if (getSynergyIsChecked(a)) return -1;
                  if (getSynergyIsChecked(b)) return 1;

                  if (a < b) return -1;
                  if (a > b) return 1;

                  return 0;
                })
                .map(synergy => (
                  <DropdownMenuCheckboxItem
                    key={synergy + '-filter'}
                    checked={(
                      table.getColumn('types')?.getFilterValue() as
                        | string[]
                        | undefined
                    )?.includes(synergy)}
                    onCheckedChange={(checked: boolean) => {
                      const filterValue =
                        (table.getColumn('types')?.getFilterValue() as
                          | string[]
                          | undefined) ?? [];

                      if (checked)
                        return table
                          .getColumn('types')
                          ?.setFilterValue([...filterValue, synergy]);
                      else
                        return table
                          .getColumn('types')
                          ?.setFilterValue(
                            filterValue.filter(
                              selectedFilter => selectedFilter !== synergy
                            )
                          );
                    }}
                  >
                    <div className='flex gap-x-2 items-center'>
                      <PokemonSynergy type={synergy} />
                      {capitalizeString(synergy)}
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div ref={parentRef} className='h-svh overflow-auto'>
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ minWidth: header.getSize() }}
                      >
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
              {rows?.length ? (
                virtualizer.getVirtualItems().map((virtualRow, index) => {
                  const row = rows[virtualRow.index];
                  return (
                    <TableRow
                      key={row.id}
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${
                          virtualRow.start - index * virtualRow.size
                        }px)`,
                      }}
                    >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
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
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
