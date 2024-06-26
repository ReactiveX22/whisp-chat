import { cx } from 'class-variance-authority';
import { ClassValue } from 'class-variance-authority/types';

import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(cx(inputs));
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}

export const toPusherKey = (key: string) => {
  return key.replace(/:/g, '__');
};
