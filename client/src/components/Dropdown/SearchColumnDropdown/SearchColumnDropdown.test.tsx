import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import SearchColumnDropdown from './SearchColumnDropdown';
import { Columns, SearchColumns } from '@/types';

describe('SearchColumnDropdown', () => {
  const mockHandleColumnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders button with label of active column', () => {
    const label = Columns.find((col) => col.accessor === 'title')?.label!;
    render(<SearchColumnDropdown activeColumn='title' handleColumnChange={vi.fn()} />);

    const button = screen.getByRole('button', { name: 'Search Column' });
    expect(button).toHaveTextContent(label); // ✅ Should match whatever label is mapped to 'title'
  });

  test('opens dropdown and displays options on click', () => {
    render(
      <SearchColumnDropdown activeColumn='title' handleColumnChange={mockHandleColumnChange} />,
    );

    const button = screen.getByLabelText('Search Column');
    fireEvent.click(button);

    const listbox = screen.getByRole('listbox');
    for (const col of SearchColumns) {
      const item = within(listbox).getByText(col.label);
      expect(item).toBeVisible();
    }
  });

  test('closes dropdown after selecting an option', () => {
    render(
      <SearchColumnDropdown activeColumn='title' handleColumnChange={mockHandleColumnChange} />,
    );

    const button = screen.getByLabelText('Search Column');
    fireEvent.click(button);

    const listbox = screen.getByRole('listbox');
    const option = within(listbox).getByText('General');
    fireEvent.click(option);

    expect(listbox).not.toBeVisible(); // or use queryByRole('listbox') and expect null
  });

  test('calls handleColumnChange with correct accessor when option is clicked', () => {
    render(
      <SearchColumnDropdown activeColumn='title' handleColumnChange={mockHandleColumnChange} />,
    );

    const button = screen.getByLabelText('Search Column');
    fireEvent.click(button);

    const targetLabel = SearchColumns.find((c) => c.accessor === 'general')?.label!;
    fireEvent.click(screen.getByText(targetLabel));

    expect(mockHandleColumnChange).toHaveBeenCalledWith('general');
  });
});
