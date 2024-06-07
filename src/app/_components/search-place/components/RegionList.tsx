import styled, { css } from "styled-components";

interface RegionListProps {
  data: string[];
  onSelect: React.Dispatch<
    React.SetStateAction<{
      region: string;
      district: string;
    }>
  >;
  selected: {
    region: string;
    district: string;
  };
  type: "region" | "district";
}

export default function RegionList({
  data,
  onSelect,
  selected,
  type,
}: RegionListProps) {
  return (
    <List>
      {data.map((value) => (
        <ListContent
          key={value}
          onClick={() => {
            if (type === "region") {
              onSelect((prev) => ({ ...prev, region: value, district: "" }));
            } else if (type === "district") {
              onSelect((prev) => ({ ...prev, district: value }));
            }
          }}
          selected={selected[type] === value}
        >
          {value}
        </ListContent>
      ))}
    </List>
  );
}

const List = styled.ul`
  width: fit-content;
  list-style: none;
  padding: 0.4rem;

  background-color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08),
    0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

const ListContent = styled.li<{ selected: boolean }>`
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  color: #161616;
  font-size: 1.4rem;

  cursor: pointer;

  &:hover {
    background-color: #0000000f;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: #e8f3ff;
      color: #1b64da;
    `}
`;
