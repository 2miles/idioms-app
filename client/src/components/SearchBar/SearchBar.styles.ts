import searchIcon from '@/images/search.svg?react';
import { styled } from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin: var(--margin-md);
  margin-bottom: 50px;
  width: 60%;
  @media (max-width: 660px) {
    width: 100%;
  }
`;

export const IconContainer = styled.span`
  position: absolute;
  left: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const Icon = styled(searchIcon)`
  width: 16px;
  height: 16px;
  color: var(--color-text-primary);
`;

export const Input = styled.input`
  position: relative;
  padding-left: var(--padding-xxl);
  width: 100%;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border) !important;
  border-color: var(--color-border) !important;
  background-color: var(--bg-dark) !important;
  color: var(--color-text-primary) !important;

  &::placeholder {
    color: var(--color-text-dim);
  }
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  top: 9px;
  right: 1px;
  height: 95%;
  display: flex;
  align-items: center;
`;
