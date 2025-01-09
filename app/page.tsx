import { PokemonTable } from '@/components/pkmn-table';

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

  const pokemon = data
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
        category,
        tier: parseInt(tier),
        additionalPick,
        type1,
        type2,
        type3,
        type4,
        bst: parseInt(attack) + parseInt(defense) + parseInt(specialDefense),
        hp: parseInt(hp),
        attack: parseInt(attack),
        defense: parseInt(defense),
        specialDefense: parseInt(specialDefense),
        attackRange: parseInt(attackRange),
        maxPP: parseInt(maxPP),
        ability,
        family,
        familyType1,
        familyType2,
        familyType3,
        familyType4,
        duo,
        regional,
        numStages,
      };
    });

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <PokemonTable pokemon={pokemon} />
      </main>
    </div>
  );
}
