import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SecondaryButton } from '@/components/ButtonStyles';
import filterIcon from '@/images/filter.svg?react';

type SearchMode = 'title' | 'keywords';

type DetailPageControlsProps = {
  prevId?: number;
  nextId?: number;
  buildHref: (id: number) => string;
  backHref: string;

  searchTerm?: string;
  searchColumn: SearchMode;
};

const ControlBar = styled.div`
  position: relative;
  width: 100%;
  padding-top: var(--margin-xl);
  padding-left: var(--padding-sm);
  padding-right: var(--padding-sm);
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavControls = styled.div`
  display: flex;
`;

const NavButton = styled(SecondaryButton)<{ $disabled?: boolean }>`
  color: ${({ $disabled }) => ($disabled ? 'var(--color-text-dim)' : 'inherit')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  opacity: ${({ $disabled }) => ($disabled ? 0.8 : 1)};
`;

const PrevButton = styled(NavButton)`
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
`;

const NextButton = styled(NavButton)`
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-left: none !important;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: flex-start; /* instead of center */
  margin-top: 10px;
  margin-top: var(--margin-lg);
`;

const FilterChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding-left: 10px;
  padding-bottom: 0px;
  border-radius: 999px;
  color: var(--color-text-dim);
  color: var(--color-brand-primary);
  background: var(--bg-darker);
  opacity: 0.9;
`;

const FilterText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FilterIcon = styled(filterIcon)`
  width: 14px;
  height: 14px;
  color: var(--color-text-dim);
  color: var(--color-brand-primary);
  flex-shrink: 0;
`;

const DetailPageControls = ({
  prevId,
  nextId,
  buildHref,
  backHref,
  searchTerm = '',
}: DetailPageControlsProps) => {
  const prevDisabled = !prevId;
  const nextDisabled = !nextId;

  const hasFilter = searchTerm.trim().length > 0;

  return (
    <ControlBar>
      <ControlsWrapper>
        <SecondaryButton as={Link} to={backHref}>
          Idiom List
        </SecondaryButton>
        <NavControls>
          <PrevButton
            as={prevDisabled ? 'button' : Link}
            to={prevDisabled ? undefined : buildHref(prevId!)}
            aria-disabled={prevDisabled}
            $disabled={prevDisabled}
          >
            ← Prev
          </PrevButton>
          <NextButton
            as={nextDisabled ? 'button' : Link}
            to={nextDisabled ? undefined : buildHref(nextId!)}
            aria-disabled={nextDisabled}
            $disabled={nextDisabled}
          >
            Next →
          </NextButton>
        </NavControls>
      </ControlsWrapper>
      {hasFilter && (
        <FilterRow>
          <FilterChip aria-label='Active filter'>
            <FilterIcon aria-hidden />
            <FilterText>{searchTerm}</FilterText>
          </FilterChip>
        </FilterRow>
      )}
    </ControlBar>
  );
};

export default DetailPageControls;
