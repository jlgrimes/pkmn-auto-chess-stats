import { PokemonTable } from '@/components/pkmn-table';
import { PokemonTableEntry } from '@/components/pkmn-table.types';
import { columns } from '@/components/pkmn-table.columns';

function fixName(csvName: string) {
  const nameParts = csvName.split('_');

  return nameParts
    .map(part => `${part[0]}${part.slice(1).toLowerCase()}`)
    .join(' ');
}

export default async function Home() {
  const res = await fetch(
    'https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/refs/heads/master/app/models/precomputed/pokemons-data.csv'
  );
  const data = await res.text();

  const pokemon: PokemonTableEntry[] = data
    .split('\n')
    .slice(1, data.split('\n').length - 1)
    .map(line => {
      const [
        index,
        name,
        category,
        tier,
        additionalPick,
        type1,
        type2,
        type3,
        type4,
        hp,
        attack,
        defense,
        specialDefense,
        attackRange,
        maxPP,
        ability,
        family,
        familyType1,
        familyType2,
        familyType3,
        familyType4,
        duo,
        regional,
        numStages,
      ] = line.split(',');

      return {
        index: index.replace('-', '/'),
        name: fixName(name),
        tier: parseInt(tier),
        types: [type1, type2, type3, type4].filter(
          type => type && type.length > 0
        ),
        hp: parseInt(hp),
        attack: parseInt(attack),
        defense: parseInt(defense),
        specialDefense: parseInt(specialDefense),
      };
    });

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]'>
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
        <PokemonTable data={pokemon} columns={columns} />
      </main>
    </div>
  );
}
