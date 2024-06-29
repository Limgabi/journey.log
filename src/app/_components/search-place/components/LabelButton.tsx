import Icon from '@/components/Icon';
import styled, { css } from 'styled-components';

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
				color={type === 'secondary' ? '#4e5968' : '#1b64da'}
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
	background-color: #e8f3ff;
	color: #1b64da;

	outline: none;
	border: none;

	${({ type }) =>
		type === 'secondary' &&
		css`
			background-color: #f2f4f6;
			color: #4e5968;
		`}
`;
