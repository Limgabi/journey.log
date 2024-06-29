import styled, { css } from 'styled-components';

interface RegionListProps {
	data: { name: string; code: string }[];
	onSelect: (data: { name: string; code: string }) => void;
}

export default function RegionList({ data, onSelect }: RegionListProps) {
	return (
		<List>
			{data.map((option, idx) => (
				<ListContent key={`${idx}-${option.code}`} onClick={() => onSelect(option)}>
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

	background-color: #fff;
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	box-shadow:
		0px 6px 16px 0px rgba(0, 0, 0, 0.08),
		0px 3px 6px -4px rgba(0, 0, 0, 0.12),
		0px 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

const ListContent = styled.li`
	padding: 0.6rem 1.2rem;
	border-radius: ${({ theme }) => theme.borderRadius.sm};

	color: #161616;
	font-size: 1.4rem;

	cursor: pointer;

	&:hover {
		background-color: #0000000f;
	}
`;
