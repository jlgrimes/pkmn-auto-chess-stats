import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { PokemonTableEntry } from './pkmn-table.types';
import { Button } from '../ui/button';
import { Column } from '@tanstack/react-table';

interface SortHeaderButtonProps {
  column: Column<PokemonTableEntry, unknown>;
  header: string;
}

// function getTypeImgUrl(type: keyof Pokemon) {
//   let slug;

//   if (type === 'hp') slug = 'HP';
//   if (type === 'attack') slug = 'ATK';
//   if (type === 'defense') slug = 'DEF';
//   if (type === 'specialDefense') slug = 'SPE_DEF';

//   if (!slug) return null;

//   return `https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/refs/heads/master/app/public/src/assets/icons/${slug}.png`;
// }

export function SortHeaderButton(props: SortHeaderButtonProps) {
  // const typeImgUrl = useMemo(() => getTypeImgUrl(props.column.columnDef.cell?.toString()), [props.type]);

  return (
    <Button
      variant={'ghost'}
      size='xs'
      onClick={() =>
        props.column.toggleSorting(props.column.getIsSorted() === 'asc')
      }
    >
      {props.header}
      {/* {typeImgUrl ? (
        <Image src={typeImgUrl} alt={props.type} width={16} height={16} />
      ) : (
        props.type
      )} */}
      {!props.column.getIsSorted() && (
        <ChevronsUpDown className='h-4 w-4 ml-1' />
      )}
      {props.column.getIsSorted() === 'asc' && (
        <ArrowUp className='h-4 w-4 ml-1' />
      )}
      {props.column.getIsSorted() === 'desc' && (
        <ArrowDown className='h-4 w-4 ml-1' />
      )}
    </Button>
  );
}
