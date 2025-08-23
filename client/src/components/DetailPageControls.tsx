import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SecondaryButton } from './ButtonStyles';

type DetailPageControlsProps = {
  prevId?: number;
  nextId?: number;
  buildHref: (id: number) => string;
  backHref: string;
};

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

const CenterButtonWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ControlBar = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
`;

const DetailPageControls = ({ prevId, nextId, buildHref, backHref }: DetailPageControlsProps) => {
  return (
    <ControlBar>
      <ControlsWrapper>
        {prevId ? (
          <ButtonLink to={buildHref(prevId)}>
            <SecondaryButton>← Prev</SecondaryButton>
          </ButtonLink>
        ) : (
          <span />
        )}

        {nextId ? (
          <ButtonLink to={buildHref(nextId)}>
            <SecondaryButton>Next →</SecondaryButton>
          </ButtonLink>
        ) : (
          <span />
        )}
      </ControlsWrapper>

      <CenterButtonWrapper>
        <ButtonLink to={backHref}>
          <SecondaryButton>Back to List</SecondaryButton>
        </ButtonLink>
      </CenterButtonWrapper>
    </ControlBar>
  );
};

export default DetailPageControls;
