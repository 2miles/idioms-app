import { NewIdiomInput } from '../../src/types';

export type AddIdiomFormData = {
  title: string;
  titleGeneral?: string;
  definition?: string;
  contributor?: string;
  timestamp?: string;
};

export const TEST_IDIOM: NewIdiomInput = {
  title: 'Break the ice',
  title_general: 'When one breaks the ice',
  definition: 'To initiate conversation in a social setting.',
  timestamps: null, // No date provided
  contributor: 'E2E Bot',
};

export const EDITED_IDIOM: NewIdiomInput = {
  title: 'Break the ice. EDIT',
  title_general: '',
  definition: 'To initiate conversation in a social setting. This is a test edit.',
  timestamps: null, // No date provided
  contributor: 'E2E Bot',
};

export const TEST_EXAMPLES: string[] = [
  'This is the first example.',
  'This is the second example.',
];

export const EDITED_EXAMPLES: string[] = [
  'This is the first example. EDITED',
  'This is the second example. EDITED',
];
