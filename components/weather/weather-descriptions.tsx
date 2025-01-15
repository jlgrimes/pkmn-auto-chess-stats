'use client';

import { useTranslations } from '@/lib/hooks/translations.hooks';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { WeatherIcon } from './weather-icon';

export const WeatherDescriptions = () => {
  const { data, isLoading } = useTranslations();
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>data fetch failed oh no</div>;

  const weathers = Object.keys(data['weather']);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {weathers.map(weather => (
        <Card key={weather + '-card'}>
          <CardHeader className='flex flex-row justify-between items-center'>
            <div className='space-y-1.5'>
              <CardTitle className='flex justify-between items-center'>
                <span>{data['weather'][weather]}</span>
              </CardTitle>
              <CardDescription>
                {data['weather_description'][weather]}
              </CardDescription>
            </div>
            <WeatherIcon weather={weather.toLowerCase()} />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
