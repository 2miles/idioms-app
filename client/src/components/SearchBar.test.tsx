import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import SearchBar from './SearchBar';
import { Idiom } from '@/types';

const mockIdioms: Idiom[] = [
  {
    id: 1,
    title: 'Break the ice',
    position: 1,
    definition: 'Start a conversation',
    timestamps: '',
    title_general: null,
    contributor: null,
    examples: [],
  },
  {
    id: 2,
    title: 'Hit the sack',
    position: 2,
    definition: 'Go to bed',
    timestamps: '',
    title_general: null,
    contributor: null,
    examples: [],
  },
];

describe('SearchBar', () => {
  const mockHandleSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('displays empty input by default', () => {
    render(<SearchBar idioms={mockIdioms} handleSearch={mockHandleSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('');
  });

  test('filters idioms by title on input', () => {
    render(<SearchBar idioms={mockIdioms} handleSearch={mockHandleSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Break' } });

    expect(mockHandleSearch).toHaveBeenLastCalledWith([mockIdioms[0]]);
  });

  test('shows all idioms when input is cleared', () => {
    render(<SearchBar idioms={mockIdioms} handleSearch={mockHandleSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '' } });

    expect(mockHandleSearch).toHaveBeenLastCalledWith(mockIdioms);
  });

  test('updates search column and filters by new column', () => {
    render(<SearchBar idioms={mockIdioms} handleSearch={mockHandleSearch} />);

    const button = screen.getByRole('button');
    fireEvent.click(button); // Open dropdown
    fireEvent.click(screen.getByText(/Definition/i)); // Change to definition column

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'conversation' } });
    expect(mockHandleSearch).toHaveBeenLastCalledWith([mockIdioms[0]]);
  });

  test('handles numeric search in position column', () => {
    render(<SearchBar idioms={mockIdioms} handleSearch={mockHandleSearch} />);

    const button = screen.getByRole('button');
    fireEvent.click(button); // Open dropdown
    fireEvent.click(screen.getByText(/Order/i)); // Change to position column

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '2' } });
    expect(mockHandleSearch).toHaveBeenLastCalledWith([mockIdioms[1]]);
  });
});
