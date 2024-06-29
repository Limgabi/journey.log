import styled, { css } from 'styled-components';

interface SelectProps {
	options: { id: string; value: string }[];
	selected: { id: string; value: string }[];
	onSelect: (option: { id: string; value: string }) => void;
}

export default function Select({ options, selected, onSelect }: SelectProps) {
	return (
		<SelectWrapper>
			{options.map(option => (
				<SelectOption
					key={option.id}
					selected={selected.some(selectedOption => selectedOption.id === option.id)}
					onClick={() => onSelect(option)}
				>
					{option.value}
				</SelectOption>
			))}
		</SelectWrapper>
	);
}

const SelectWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 0.4rem;

	background-color: #fff;
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	box-shadow:
		0px 6px 16px 0px rgba(0, 0, 0, 0.08),
		0px 3px 6px -4px rgba(0, 0, 0, 0.12),
		0px 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

const SelectOption = styled.div<{ selected: boolean }>`
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
