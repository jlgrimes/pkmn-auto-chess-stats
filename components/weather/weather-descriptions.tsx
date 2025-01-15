'use client';

import { useTranslations } from '@/lib/hooks/translations.hooks';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

export const WeatherDescriptions = () => {
  const { data, isLoading } = useTranslations();
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>data fetch failed oh no</div>;

  const weathers = Object.keys(data['weather']);

  return (
    <div className='grid grid-cols-3 gap-4'>
      {weathers.map(weather => (
        <Card>
          <CardHeader>
            <CardTitle>{data['weather'][weather]}</CardTitle>
            <CardDescription>
              {data['weather_description'][weather]}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
