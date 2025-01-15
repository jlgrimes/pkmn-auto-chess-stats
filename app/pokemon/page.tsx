import { PageHeader } from '@/components/page-header';
import { getAbilityPower } from '@/components/pkmn-table/ability.utils';
import { PokemonTable } from '@/components/pkmn-table/pkmn-table';
import { columns } from '@/components/pkmn-table/pkmn-table.columns';
import { PokemonTableEntry } from '@/components/pkmn-table/pkmn-table.types';
import { fetchTranslations } from '@/lib/hooks/translations.hooks';
import { capitalizeString } from '@/lib/utils';

// @typescrip
export default async function Pokemon() {
  const translationData = await fetchTranslations();

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
        ability,
        _family,
        _familyType1,
        _familyType2,
        _familyType3,
        _familyType4,
        _duo,
        _regional,
        numStages,
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
        abilityPower: getAbilityPower(translationData, ability, parseInt(tier)),
        tier: parseInt(tier),
        types,
        hp: parseInt(hp),
        attack: parseInt(attack),
        defense: parseInt(defense),
        specialDefense: parseInt(specialDefense),
        // Think the max tier is always equal to the highest star value?
        maxTier: parseInt(numStages),
      };
    });

  return (
    <main className='row-start-2 items-center sm:items-start space-y-2'>
      <PageHeader
        header={'pokemon stats'}
        subheader={
          'Look up any Pokemon. Click on one to view usage statistics.'
        }
      />
      <PokemonTable data={pokemon} columns={columns} synergies={synergies} />
    </main>
  );
}
