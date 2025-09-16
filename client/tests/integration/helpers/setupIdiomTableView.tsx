import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { type Mock } from 'vitest';

import userEvent from '@testing-library/user-event';

import { publicIdiomFinder } from '@/apis/idiomFinder';
import IdiomTableView from '@/components/IdiomTableView/IdiomTableView';
import { Idiom } from '@/types';

export const mockIdioms: Idiom[] = [
  {
    id: 1,
    title: 'Break the ice',
    position: 1,
    definition: 'To initiate conversation in a social setting',
    timestamps: '2023-12-01',
    title_general: null,
    contributor: null,
    examples: [],
  },
  {
    id: 2,
    title: 'Hit the sack',
    position: 2,
    definition: 'To go to bed',
    timestamps: '2023-12-02',
    title_general: null,
    contributor: null,
    examples: [],
  },
];

export function setupIdiomTableView({
  overrideIdioms = mockIdioms,
  initialEntries = ['/?page=1&limit=20&sortField=timestamps&sortOrder=desc'],
}: {
  overrideIdioms?: Idiom[];
  initialEntries?: string[];
} = {}) {
  const mock = publicIdiomFinder.get as Mock;
  if (!mock.getMockImplementation()) {
    mock.mockResolvedValue({
      data: {
        data: {
          idioms: overrideIdioms,
          totalCount: overrideIdioms.length,
        },
      },
    });
  }

  render(
    <MemoryRouter initialEntries={initialEntries}>
      <IdiomTableView />
    </MemoryRouter>,
  );

  const user = userEvent.setup();
  const searchBar = screen.getByPlaceholderText(/search/i);

  return { user, searchBar };
}
