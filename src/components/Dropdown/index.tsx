import styled from 'styled-components';

interface DropdownProps {
  options: { label: string; value: string | number }[];
  onClick: VoidFunction;
}

export default function Dropdown({ options, onClick }: DropdownProps) {
  return (
    <DropdownWrapper>
      {options.map(option => (
        <Option key={option.value} onClick={onClick}>
          {option.label}
        </Option>
      ))}
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.ul`
  width: fit-content;
  list-style: none;
  padding: 0.4rem;

  background-color: ${({ theme }) => theme.colors.greyScale.grayScale_0};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow:
    0px 6px 16px 0px rgba(0, 0, 0, 0.08),
    0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 9px 28px 8px rgba(0, 0, 0, 0.05);

  overflow-y: auto;
`;

const Option = styled.li`
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  color: ${({ theme }) => theme.colors.greyScale.warmGray_6};
  font-size: 1.4rem;

  cursor: pointer;

  &:hover {
    background-color: #0000000f;
  }
`;
