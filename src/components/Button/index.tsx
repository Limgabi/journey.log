import { ReactNode } from 'react';

import styled, { css } from 'styled-components';

interface ButtonProps {
  children: ReactNode;
  onClick: VoidFunction;
  disabled?: boolean;
}

export default function Button({ children, onClick, disabled = false }: ButtonProps) {
  return (
    <ButtonWrapper onClick={onClick} disabled={disabled}>
      {children}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<{ disbled?: boolean }>`
  padding: 0.8rem 1.2rem;

  outline: none;
  border: none;

  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.primary.blue_3};
  color: ${({ theme }) => theme.colors.greyScale.grayScale_0};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.colors.greyScale.grayScale_1};
      color: ${theme.colors.greyScale.grayScale_3};
      cursor: not-allowed;
    `};
`;
