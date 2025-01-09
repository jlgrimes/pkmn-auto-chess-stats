import { Cell, flexRender } from '@tanstack/react-table';
import { PokemonTableEntry } from './pkmn-table.types';

interface PokemonTableCellContentProps {
  cell: Cell<PokemonTableEntry, unknown>;
}

export function PokemonTableContentCell(props: PokemonTableCellContentProps) {
  return flexRender(props.cell.column.columnDef.cell, props.cell.getContext());
}
