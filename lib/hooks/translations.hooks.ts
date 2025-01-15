import useSWR from 'swr';

export const useTranslations = () => {
  const { data, isLoading } = useSWR<Record<string, Record<string, string>>>(
    ['translations'],
    () =>
      fetch(
        'https://www.pokemon-auto-chess.com/locales/en/translation.json'
      ).then(res => res.json())
  );

  return {
    data,
    isLoading,
  };
};
