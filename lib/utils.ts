import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeString(str: string) {
  const nameParts = str.split('_');

  return nameParts
    .map(part => `${part[0]}${part.slice(1).toLowerCase()}`)
    .join(' ');
}
