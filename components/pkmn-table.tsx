import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Pokemon } from './pkmn-table.types';

interface PokemonTableProps {
  pokemon: Pokemon[];
}

export function PokemonTable(props: PokemonTableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px]'></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className='text-right'>HP</TableHead>
          <TableHead className='text-right'>Attack</TableHead>
          <TableHead className='text-right'>Defense</TableHead>
          <TableHead className='text-right'>Sp Def</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.pokemon.map(pkmn => (
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
        ))}
      </TableBody>
    </Table>
  );
}
