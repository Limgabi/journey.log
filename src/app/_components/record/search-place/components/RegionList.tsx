import styled, { css } from 'styled-components';

interface RegionListProps {
  data: { name: string; code: string }[];
  selected: { name: string; code: string };
  onSelect: (data: { name: string; code: string }) => void;
}

export default function RegionList({ data, selected, onSelect }: RegionListProps) {
  return (
    <List>
      {data.map((option, idx) => (
        <ListContent
          key={`${idx}-${option.code}`}
          onClick={() => onSelect(option)}
          selected={option.code === selected.code}
        >
          {option.name}
        </ListContent>
      ))}
    </List>
  );
}

const List = styled.ul`
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

const ListContent = styled.li<{ selected: boolean }>`
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
      background-color: ${theme.colors.primary.blue_0};
      color: ${theme.colors.primary.blue_5};
    `}
`;
