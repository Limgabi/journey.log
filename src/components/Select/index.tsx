import { MutableRefObject, forwardRef } from 'react';

import styled, { css } from 'styled-components';

interface SelectProps {
  scrollRef?: MutableRefObject<HTMLDivElement | null> | null;
  options: { id: string; value: string }[];
  selected: { id: string; value: string }[];
  onSelect: (option: { id: string; value: string }) => void;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ scrollRef, options, selected, onSelect }, ref) => {
    return (
      <SelectWrapper ref={ref}>
        {options.map(option => (
          <SelectOption
            key={option.id}
            selected={selected.some(selectedOption => selectedOption.id === option.id)}
            onClick={() => onSelect(option)}
          >
            {option.value}
          </SelectOption>
        ))}
        {scrollRef && <ScrollTrigger ref={scrollRef} />}
      </SelectWrapper>
    );
  },
);

export default Select;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-height: 40rem;
  padding: 0.4rem;

  background-color: ${({ theme }) => theme.colors.greyScale.grayScale_0};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow:
    0px 6px 16px 0px rgba(0, 0, 0, 0.08),
    0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 9px 28px 8px rgba(0, 0, 0, 0.05);

  overflow-y: auto;
`;

const SelectOption = styled.div<{ selected: boolean }>`
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  color: ${({ theme }) => theme.colors.greyScale.warmGray_6};
  font-size: 1.4rem;

  cursor: pointer;

  &:hover {
    background-color: #0000000f;
  }

  ${({ selected, theme }) =>
    selected &&
    css`
      background-color: ${theme.colors.greyScale.grayScale_1};
      color: ${theme.colors.primary.blue_5};
    `}
`;

const ScrollTrigger = styled.div`
  height: 1px !important;
  width: 100%;
`;
