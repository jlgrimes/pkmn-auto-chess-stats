import { PageHeader } from '@/components/page-header';

export default async function Home() {
  return (
    <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
      <PageHeader
        header={'pokemon auto chess stats'}
        subheader={
          <>
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
          </>
        }
      />
    </main>
  );
}
