import { PageHeader } from '@/components/page-header';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className='flex flex-col gap-2 row-start-2 items-center sm:items-start'>
      <PageHeader
        header={'pokemon auto chess stats'}
        subheader={
          <>
            Analytics for{' '}
            <Link
              className='underline'
              href='https://www.pokemon-auto-chess.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pokemon Auto Chess
            </Link>
            . Fan made.
          </>
        }
      />
      <div>
        <div className='text-base text-muted-foreground'>
          View advanced analytics for each Pokemon here at the{' '}
          <Link className='underline' href='/pokemon'>
            Pokemon
          </Link>{' '}
          tab.
        </div>
        <div className='text-base text-muted-foreground'>
          Forget what weather is which? Me too. Refresh your memory at the{' '}
          <Link className='underline' href='/pokemon'>
            Weather
          </Link>{' '}
          tab.
        </div>
      </div>
      <div>
        <div className='text-base text-muted-foreground'>
          More tools to come. Have a good day!
        </div>
      </div>
      <div className='text-base text-muted-foreground'>
        - Jared{' '}
        <Link
          className='underline'
          href='https://x.com/jgrimesey'
          target='_blank'
          rel='noopener noreferrer'
        >
          (@jgrimesey on X)
        </Link>
      </div>
    </main>
  );
}
