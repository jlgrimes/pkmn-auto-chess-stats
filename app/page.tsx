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

export default async function Home() {
  const res = await fetch(
    'https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChess/refs/heads/master/app/models/precomputed/pokemons-data.csv'
  );
  const data = await res.text();

  const pokemon = data
    .split('\n')
    .slice(1)
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
      };
    });

  console.log(pokemon);

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pokemon.map(pkmn => (
              <TableRow key={pkmn.index}>
                <TableCell>
                  <Image
                    src={`https://raw.githubusercontent.com/keldaanCommunity/SpriteCollab/master/portrait/${pkmn.index}/Normal.png`}
                    alt={pkmn.name}
                    width={40}
                    height={40}
                  />
                </TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className='text-right'>$250.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
