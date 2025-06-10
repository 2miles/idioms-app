import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import { describe, test, expect, vi } from 'vitest';

const renderModal = (isOpen = true, onClose = vi.fn()) =>
  render(
    <Modal title='Test Modal' isOpen={isOpen} onClose={onClose}>
      Content
    </Modal>,
  );

describe('Modal', () => {
  test('does not render when closed', () => {
    renderModal(false);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test('renders title and content when open', () => {
    renderModal();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('calls onClose when clicking close button', async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();
    renderModal(true, onCloseMock);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('does not call onClose when clicking overlay', async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();
    renderModal(true, onCloseMock);

    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
