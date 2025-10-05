
import { Gospel } from './types';

export const GOSPEL_COLORS: Record<Gospel, { bg: string; text: string; border: string }> = {
  [Gospel.Matthew]: { bg: 'bg-red-500', text: 'text-red-100', border: 'border-red-500' },
  [Gospel.Mark]: { bg: 'bg-blue-500', text: 'text-blue-100', border: 'border-blue-500' },
  [Gospel.Luke]: { bg: 'bg-green-500', text: 'text-green-100', border: 'border-green-500' },
  [Gospel.John]: { bg: 'bg-yellow-500', text: 'text-yellow-100', border: 'border-yellow-500' },
};

export const GOSPEL_NAMES: Gospel[] = [Gospel.Matthew, Gospel.Mark, Gospel.Luke, Gospel.John];
