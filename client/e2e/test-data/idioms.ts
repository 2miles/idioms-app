export type AddIdiomFormData = {
  title: string;
  title_general?: string;
  definition?: string;
  contributor?: string;
  timestamp?: string | null;
  origin?: string;
};

export const TEST_IDIOM: AddIdiomFormData = {
  title: 'Break the ice',
  title_general: 'When one breaks the ice',
  definition: 'To initiate conversation in a social setting.',
  timestamp: null, // No date provided
  contributor: 'E2E Bot',
  origin: 'Common social idiom',
};

export const EDITED_IDIOM: AddIdiomFormData = {
  title: 'Break the ice. EDIT',
  title_general: '',
  definition: 'To initiate conversation in a social setting. This is a test edit.',
  timestamp: null, // No date provided
  contributor: 'E2E Bot',
  origin: 'Common social idiom. EDIT',
};

export const TEST_EXAMPLES: string[] = [
  'This is the first example.',
  'This is the second example.',
];

export const EDITED_EXAMPLES: string[] = [
  'This is the first example. EDITED',
  'This is the second example. EDITED',
];
