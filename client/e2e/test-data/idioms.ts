import { Idiom, Example, NewIdiomInput } from '../../src/types';

export type AddIdiomFormData = {
  title: string;
  titleGeneral?: string;
  definition?: string;
  contributor?: string;
  timestamp?: string;
};

// export type AddExampleFormData = {}
// export type EditExampleFormData = {}

export const ADD_IDIOM_FORM_DATA_1: NewIdiomInput = {
  title: 'Break the ice',
  title_general: 'When one breaks the ice',
  definition: 'To initiate conversation in a social setting.',
  timestamps: null, // No date provided
  contributor: 'E2E Bot',
};

export const EXAMPLE_1: Example = {
  example_id: 101,
  idiom_id: 1,
  example: 'He tried to break the ice by telling a joke.',
};

export const EXAMPLE_2: Example = {
  example_id: 102,
  idiom_id: 2,
  example: 'She spilled the beans about the surprise party.',
};

export const TEST_IDIOM_1: Idiom = {
  id: 1,
  title: 'Break the ice',
  timestamps: new Date().toISOString(),
  title_general: 'social interaction',
  definition: 'To initiate conversation in a social setting.',
  contributor: 'TestUser',
  position: 1,
  examples: [],
};

export const IDIOM_WITH_EXAMPLES_1: Idiom = {
  ...TEST_IDIOM_1,
  examples: [EXAMPLE_1, EXAMPLE_2],
};
