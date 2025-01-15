import useSWR from 'swr';

export const TRANSLATION_KEY = ['translations'];

export const fetchTranslations = (): Promise<
  Record<string, Record<string, string>>
> =>
  fetch('https://www.pokemon-auto-chess.com/locales/en/translation.json').then(
    res => res.json()
  );

export const useTranslations = () => {
  const { data, isLoading } = useSWR(TRANSLATION_KEY, fetchTranslations);

  return {
    data,
    isLoading,
  };
};
