import styled from 'styled-components';
import Icon from '../Icon';

interface InputProps {
	type?: 'search' | 'text';
	value: string | number;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSearch?: () => void;
}

export default function Input({ type = 'text', value, handleChange, handleSearch }: InputProps) {
	return (
		<InputWrapper>
			<input value={value} onChange={handleChange} />
			{type === 'search' && (
				<button onClick={handleSearch}>
					<Icon icon="Search" width={14} height={14} cursor="pointer" />
				</button>
			)}
		</InputWrapper>
	);
}

const InputWrapper = styled.div`
	display: flex;
	align-items: center;

	border: 0.1rem solid #d9d9d9;
	border-radius: ${({ theme }) => theme.borderRadius.sm};

	input {
		padding: 0.8rem;
		border-radius: ${({ theme }) => theme.borderRadius.sm};
		border: none;
		outline: none;
	}

	button {
		padding: 0.8rem;
		border: none;
		outline: none;
		background-color: transparent;
	}
`;
