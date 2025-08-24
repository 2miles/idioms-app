import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SecondaryButton } from './ButtonStyles';

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

const PrevButton = styled(SecondaryButton)`
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
`;
const NextButton = styled(SecondaryButton)`
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-left: none !important;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
`;

const DetailPageControls = ({ prevId, nextId, buildHref, backHref }: DetailPageControlsProps) => {
  return (
    <ControlBar>
      <ControlsWrapper>
        <ButtonLink to={backHref}>
          <SecondaryButton>Idiom List</SecondaryButton>
        </ButtonLink>
        <NavControls>
          {prevId ? (
            <ButtonLink to={buildHref(prevId)}>
              <PrevButton>← Prev</PrevButton>
            </ButtonLink>
          ) : (
            <span />
          )}

          {nextId ? (
            <ButtonLink to={buildHref(nextId)}>
              <NextButton>Next →</NextButton>
            </ButtonLink>
          ) : (
            <span />
          )}
        </NavControls>
      </ControlsWrapper>
    </ControlBar>
  );
};

export default DetailPageControls;
