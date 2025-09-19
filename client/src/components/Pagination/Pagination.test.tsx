import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import Pagination from './Pagination';

describe('Pagination', () => {
  const paginateMock = vi.fn();

  describe('Rendering', () => {
    // Fix this. Its now a false positive.
    it('renders all page numbers without spacers if total pages <= maxPageNumbersToShow', () => {
      const { container } = render(
        <Pagination
          itemsPerPage={10}
          totalItems={30} // 3 pages
          currentPage={1}
          paginate={paginateMock}
          isCompact={false}
        />,
      );

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(container.querySelector('.thin-gap')).not.toBeInTheDocument();
    });

    it('renders ellipsis (thin-gaps) when total pages > maxPageNumbersToShow', () => {
      render(
        <Pagination
          itemsPerPage={1}
          totalItems={10}
          currentPage={5}
          paginate={paginateMock}
          isCompact={false}
        />,
      );
      const thinGaps = screen
        .getAllByRole('listitem')
        .filter((li) => li.classList.contains('thin-gap'));
      expect(thinGaps.length).toBeGreaterThan(0);
    });
  });

  describe('Navagation', () => {
    it('highlights the active page', () => {
      render(
        <Pagination
          itemsPerPage={1}
          totalItems={5}
          currentPage={3}
          paginate={paginateMock}
          isCompact={false}
        />,
      );
      const activePage = screen.getByText('3').closest('li');
      expect(activePage).toHaveClass('active');
    });

    it('calls paginate with correct page when clicking on page number', () => {
      render(
        <Pagination
          itemsPerPage={10}
          totalItems={30}
          currentPage={1}
          paginate={paginateMock}
          isCompact={false}
        />,
      );
      fireEvent.click(screen.getByText('2'));
      expect(paginateMock).toHaveBeenCalledWith(2);
    });

    it('disables previous button on first page', () => {
      render(
        <Pagination
          itemsPerPage={10}
          totalItems={30}
          currentPage={1}
          paginate={paginateMock}
          isCompact={false}
        />,
      );
      const prevButton = screen.getByText('<').closest('li');
      expect(prevButton).toHaveClass('disabled');
    });

    it('disables next button on last page', () => {
      render(
        <Pagination
          itemsPerPage={10}
          totalItems={30}
          currentPage={3}
          paginate={paginateMock}
          isCompact={false}
        />,
      );
      const nextButton = screen.getByText('>').closest('li');
      expect(nextButton).toHaveClass('disabled');
    });

    it('calls paginate with previous page when clicking previous', () => {
      render(
        <Pagination
          itemsPerPage={10}
          totalItems={30}
          currentPage={2}
          paginate={paginateMock}
          isCompact={false}
        />,
      );
      fireEvent.click(screen.getByText('<'));
      expect(paginateMock).toHaveBeenCalledWith(1);
    });

    it('calls paginate with next page when clicking next', () => {
      render(
        <Pagination
          itemsPerPage={10}
          totalItems={30}
          currentPage={2}
          paginate={paginateMock}
          isCompact={false}
        />,
      );
      fireEvent.click(screen.getByText('>'));
      expect(paginateMock).toHaveBeenCalledWith(3);
    });
  });
});
