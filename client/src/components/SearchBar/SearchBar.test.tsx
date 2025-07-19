import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import SearchBar from './SearchBar';
import { ColumnAccessors, SearchColumnAccessors } from '@/types';

describe('SearchBar', () => {
  const mockOnSearchTermChange = vi.fn();
  const mockOnSearchColumnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays empty input by default', () => {
    render(
      <SearchBar
        searchTerm=''
        searchColumn='title'
        onSearchTermChange={mockOnSearchTermChange}
        onSearchColumnChange={mockOnSearchColumnChange}
      />,
    );

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('');
  });

  test('calls onSearchTermChange when user types', () => {
    render(
      <SearchBar
        searchTerm=''
        searchColumn='title'
        onSearchTermChange={mockOnSearchTermChange}
        onSearchColumnChange={mockOnSearchColumnChange}
      />,
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'hello' } });

    expect(mockOnSearchTermChange).toHaveBeenCalledWith('hello');
  });

  test('calls onSearchColumnChange when dropdown is changed', () => {
    render(
      <SearchBar
        searchTerm=''
        searchColumn='title'
        onSearchTermChange={mockOnSearchTermChange}
        onSearchColumnChange={mockOnSearchColumnChange}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button); // Open dropdown
    fireEvent.click(screen.getByText(/General/i)); // Select new column

    expect(mockOnSearchColumnChange).toHaveBeenCalledWith('general' as SearchColumnAccessors);
  });
});
