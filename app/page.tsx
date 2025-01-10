import { PokemonTable } from '@/components/pkmn-table';
import { columns } from '@/components/pkmn-table.columns';
import { PokemonTableEntry } from '@/components/pkmn-table.types';
import { capitalizeString } from '@/lib/utils';

// @typescrip
export default async function Home() {
  const res = await fetch(
    'https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/refs/heads/master/app/models/precomputed/pokemons-data.csv'
  );
  const data = await res.text();

  const synergies: string[] = [];

  const pokemon: PokemonTableEntry[] = data
    .split('\n')
    .slice(1, data.split('\n').length - 1)
    .map(line => {
      const [
        index,
        name,
        _category,
        tier,
        _additionalPick,
        type1,
        type2,
        type3,
        type4,
        hp,
        attack,
        defense,
        specialDefense,
        _attackRange,
        _maxPP,
        _ability,
        _family,
        _familyType1,
        _familyType2,
        _familyType3,
        _familyType4,
        _duo,
        _regional,
        _numStages,
      ] = line.split(',');

      const types = [type1, type2, type3, type4].filter(
        type => type && type.length > 0
      );

      for (const type of types) {
        if (!synergies.includes(type)) synergies.push(type);
      }

      return {
        index: index.replace('-', '/'),
        name: capitalizeString(name),
        tier: parseInt(tier),
        types,
        hp: parseInt(hp),
        attack: parseInt(attack),
        defense: parseInt(defense),
        specialDefense: parseInt(specialDefense),
      };
    });

  return (
    <div className='items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <div className='space-y-2'>
          <div className='scroll-m-20 text-3xl font-bold tracking-tight'>
            pokemon auto chess stats
          </div>
          <div className='text-base text-muted-foreground'>
            Analytics for{' '}
            <a
              className='underline'
              href='https://www.pokemon-auto-chess.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pokemon Auto Chess
            </a>
            . Fan made.
          </div>
        </div>
        <PokemonTable data={pokemon} columns={columns} synergies={synergies} />
      </main>
    </div>
  );
}
