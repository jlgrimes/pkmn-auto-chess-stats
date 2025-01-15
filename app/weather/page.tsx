import { PageHeader } from '@/components/page-header';
import { WeatherDescriptions } from '@/components/weather/weather-descriptions';

export default async function Weather() {
  return (
    <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
      <PageHeader
        header={'weather'}
        subheader={'Each of the in-game weathers and their effects.'}
      />
      <WeatherDescriptions />
    </main>
  );
}
