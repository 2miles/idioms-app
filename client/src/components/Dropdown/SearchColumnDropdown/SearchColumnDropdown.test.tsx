import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import SearchColumnDropdown from './SearchColumnDropdown';
import { Columns } from '@/types';

describe('SearchColumnDropdown', () => {
  const mockHandleColumnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders button with label of active column', () => {
    const label = Columns.find((col) => col.accessor === 'title')?.label!;
    render(<SearchColumnDropdown activeColumn='title' handleColumnChange={vi.fn()} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(label); // ✅ assert the label shown is correct
  });

  test('opens dropdown and displays options on click', () => {
    render(
      <SearchColumnDropdown activeColumn='title' handleColumnChange={mockHandleColumnChange} />,
    );

    const label = Columns.find((col) => col.accessor === 'title')?.label!;
    const button = screen.getByRole('button', { name: label });
    fireEvent.click(button);

    const listbox = screen.getByRole('listbox');
    for (const col of Columns) {
      const item = within(listbox).getByText(col.label);
      expect(item).toBeVisible();
    }
  });

  test('closes dropdown after selecting an option', () => {
    render(
      <SearchColumnDropdown activeColumn='title' handleColumnChange={mockHandleColumnChange} />,
    );

    const button = screen.getByRole('button', { name: 'Idiom' });
    fireEvent.click(button);

    const listbox = screen.getByRole('listbox');
    const option = within(listbox).getByText('Definition');
    fireEvent.click(option);

    expect(listbox).not.toBeVisible(); // or use queryByRole('listbox') and expect null
  });

  test('calls handleColumnChange with correct accessor when option is clicked', () => {
    render(
      <SearchColumnDropdown activeColumn='title' handleColumnChange={mockHandleColumnChange} />,
    );

    const label = Columns.find((col) => col.accessor === 'title')?.label!;
    const button = screen.getByRole('button', { name: label });
    fireEvent.click(button);

    const targetLabel = Columns.find((c) => c.accessor === 'definition')?.label!;
    fireEvent.click(screen.getByText(targetLabel));

    expect(mockHandleColumnChange).toHaveBeenCalledWith('definition');
  });
});
