import styled, { css } from 'styled-components';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

interface LabelButtonProps {
  type?: 'primary' | 'secondary';
  value: string;
  onClick: () => void;
}

export default function LabelButton({ value, onClick, type }: LabelButtonProps) {
  return (
    <LabelButtonWrapper onClick={onClick} type={type}>
      <Icon
        icon="Close"
        width={8}
        height={8}
        color={
          type === 'secondary' ? theme.colors.greyScale.coolGray_4 : theme.colors.primary.blue_5
        }
        cursor="pointer"
      />
      {value}
    </LabelButtonWrapper>
  );
}

const LabelButtonWrapper = styled.button<{ type?: string }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem;

  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.colors.primary.blue_0};
  color: ${({ theme }) => theme.colors.primary.blue_5};

  outline: none;
  border: none;

  ${({ type, theme }) =>
    type === 'secondary' &&
    css`
      background-color: ${theme.colors.greyScale.grayScale_1};
      color: ${theme.colors.greyScale.coolGray_4};
    `}
`;
