import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { PkmnTableSort, Pokemon } from './pkmn-table.types';
import { Button } from './ui/button';

interface SortHeaderButtonProps {
  type: keyof Pokemon;
  sort: PkmnTableSort;
  setSort: (newSort: PkmnTableSort) => void;
}

export function SortHeaderButton(props: SortHeaderButtonProps) {
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => {
        if (props.sort.by === props.type) {
          return props.setSort({
            by: props.type,
            order: props.sort.order === 'asc' ? 'desc' : 'asc',
          });
        }

        return props.setSort({
          by: props.type,
          order: props.sort.order,
        });
      }}
    >
      {props.type}
      {props.sort.order === null && <ChevronsUpDown className='h-4 w-4 ml-1' />}
      {props.sort.by === props.type && props.sort.order === 'asc' && (
        <ArrowUp className='h-4 w-4 ml-1' />
      )}
      {props.sort.by === props.type && props.sort.order === 'desc' && (
        <ArrowDown className='h-4 w-4 ml-1' />
      )}
    </Button>
  );
}
