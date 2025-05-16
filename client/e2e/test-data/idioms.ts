import { Idiom, Example } from '../../src/types'; // adjust path if needed
import { generateOffsetTimestamp } from '../utils/format';

export type AddIdiomFormData = {
  title: string;
  titleGeneral?: string;
  definition?: string;
  contributor?: string;
  timestamp?: string;
};

// export type AddExampleFormData = {}
// export type EditExampleFormData = {}

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

export const EXAMPLE_3: Example = {
  example_id: 103,
  idiom_id: 1,
  example: 'The host broke the ice with a board game.',
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

export const TEST_IDIOM_2: Idiom = {
  id: 2,
  title: 'Spill the beans',
  timestamps: new Date().toISOString(),
  title_general: 'revealing secrets',
  definition: 'To reveal secret information.',
  contributor: 'TestUser',
  position: 2,
  examples: [],
};

export const IDIOM_WITH_EXAMPLES_1: Idiom = {
  ...TEST_IDIOM_1,
  examples: [EXAMPLE_1, EXAMPLE_3],
};

export const IDIOM_WITH_EXAMPLES_2: Idiom = {
  ...TEST_IDIOM_2,
  examples: [EXAMPLE_2],
};

export function generatePaginatedIdioms(count: number): Idiom[] {
  return Array.from({ length: count }, (_, i) => ({
    id: 1000 + i,
    title: `Test Idiom ${i + 1}`,
    timestamps: generateOffsetTimestamp(i),
    title_general: null,
    definition: `Definition ${i + 1}`,
    contributor: 'PaginationTest',
    position: i + 1,
    examples: [],
  }));
}
