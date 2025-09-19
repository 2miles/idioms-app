import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SecondaryButton } from '@/components/ButtonStyles';

type DetailPageControlsProps = {
  prevId?: number;
  nextId?: number;
  buildHref: (id: number) => string;
  backHref: string;
};

const ControlBar = styled.div`
  position: relative;
  width: 100%;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
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

const DetailPageControls = ({ prevId, nextId, buildHref, backHref }: DetailPageControlsProps) => {
  const prevDisabled = !prevId;
  const nextDisabled = !nextId;

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
    </ControlBar>
  );
};

export default DetailPageControls;
