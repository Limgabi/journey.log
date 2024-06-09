import Icon from '@/components/Icon';
import styled from 'styled-components';

export default function LabelButton({ value, onClick }: any) {
	return (
		<LabelButtonWrapper onClick={onClick}>
			<Icon icon="CloseOutlined" width={14} height={14} color="#1b64da" cursor="pointer" />
			{value}
		</LabelButtonWrapper>
	);
}

const LabelButtonWrapper = styled.button`
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
`;
