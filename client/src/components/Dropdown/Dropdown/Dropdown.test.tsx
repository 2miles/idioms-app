import { describe, expect, test, vi } from 'vitest';

import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Dropdown from './Dropdown';

describe('Dropdown', () => {
  test('renders with provided label', () => {
    render(<Dropdown label='Test Label' options={['Option 1']} />);
    expect(screen.getByRole('button')).toHaveTextContent('Test Label');
  });

  test('toggles visibility on click', () => {
    render(<Dropdown label='Click Me' options={['One']} />);
    const button = screen.getByRole('button', { name: 'Click Me' });

    // Listbox shouldn't be in the DOM yet
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByRole('listbox')).toBeVisible();

    fireEvent.click(button);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('calls onOptionClick and closes if closeOnSelect is true', () => {
    const mock = vi.fn();
    render(<Dropdown label='Click' options={['First']} closeOnSelect onOptionClick={mock} />);

    const button = screen.getByRole('button', { name: 'Click' });
    fireEvent.click(button);
    fireEvent.click(within(screen.getByRole('listbox')).getByText('First'));

    expect(mock).toHaveBeenCalledWith('First');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('does not close if closeOnSelect is false', () => {
    const mock = vi.fn();
    render(
      <Dropdown label='Keep Open' options={['Keep']} closeOnSelect={false} onOptionClick={mock} />,
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Keep'));
    expect(mock).toHaveBeenCalledWith('Keep');
    expect(screen.getByRole('listbox')).toBeVisible();
  });

  test('closes dropdown on outside click', async () => {
    render(
      <div>
        <Dropdown label='Dropdown' options={['A']} />
        <button>Outside</button>
      </div>,
    );

    const [dropdownButton] = screen.getAllByRole('button');
    fireEvent.click(dropdownButton);
    expect(screen.getByRole('listbox')).toBeVisible();

    await userEvent.click(screen.getByText('Outside'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
