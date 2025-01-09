import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { PkmnTableSort, Pokemon } from './pkmn-table.types';
import { Button } from './ui/button';
import Image from 'next/image';
import { useMemo } from 'react';

interface SortHeaderButtonProps {
  type: keyof Pokemon;
  sort: PkmnTableSort;
  setSort: (newSort: PkmnTableSort) => void;
}

function getTypeImgUrl(type: keyof Pokemon) {
  let slug;

  if (type === 'hp') slug = 'HP';
  if (type === 'attack') slug = 'ATK';
  if (type === 'defense') slug = 'DEF';
  if (type === 'specialDefense') slug = 'SPE_DEF';

  if (!slug) return null;

  return `https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/refs/heads/master/app/public/src/assets/icons/${slug}.png`;
}

export function SortHeaderButton(props: SortHeaderButtonProps) {
  const typeImgUrl = useMemo(() => getTypeImgUrl(props.type), [props.type]);

  return (
    <Button
      variant='ghost'
      size='xs'
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
      {typeImgUrl ? (
        <Image src={typeImgUrl} alt={props.type} width={16} height={16} />
      ) : (
        props.type
      )}
      {props.sort.by !== props.type && (
        <ChevronsUpDown className='h-4 w-4 ml-1' />
      )}
      {props.sort.by === props.type && props.sort.order === 'asc' && (
        <ArrowUp className='h-4 w-4 ml-1' />
      )}
      {props.sort.by === props.type && props.sort.order === 'desc' && (
        <ArrowDown className='h-4 w-4 ml-1' />
      )}
    </Button>
  );
}
