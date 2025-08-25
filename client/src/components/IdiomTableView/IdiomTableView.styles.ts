import styled from 'styled-components';
import RestoreIcon from '@/images/arrow-restore.svg?react';
import { SecondaryButton } from '@/components/ButtonStyles';

export const StyledRestoreIcon = styled(RestoreIcon)`
  width: 22px;
  height: 22px;
  margin-top: 2px;
  margin-left: 0px;
  margin-right: 0px;
`;

export const TableSectionWrapper = styled.div`
  margin: var(--margin-md) auto var(--margin-xxl);
  background-color: transparent;

  border-radius: var(--radius-sm);
`;

export const TableControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .bottom-row {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
    flex-wrap: wrap;
  }

  .spacer {
    flex: 1 1 auto;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: var(--space-md) !important;

  @media (min-width: 661px) {
    width: auto;
  }
`;

export const ResetButton = styled(SecondaryButton)`
  margin-bottom: 11px;
  border-radius: var(--radius-sm) !important;
`;

export const ShowingText = styled.p`
  margin-right: auto;
  white-space: nowrap;
  font-size: var(--font-md);
  font-weight: 500;
  margin-bottom: var(--margin-sm);
  padding-bottom: var(--padding-sm);
  color: var(--color-text-primary);
  opacity: 0.8;
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--margin-sm);
`;

export const RightGroup = styled.div`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--gap-sm);
  margin-left: 'auto';
`;

export const LeftGroup = styled.div`
  display: 'inline-flex';
  gap: 'var(--gap-sm)';
`;
