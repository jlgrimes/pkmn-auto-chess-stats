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
import { useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { capitalizeString } from '@/lib/utils';

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
          <DropdownMenuTrigger>Filter</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Synergies</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {props.synergies.map(synergy => (
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
                {capitalizeString(synergy)}
              </DropdownMenuCheckboxItem>
            ))}
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
