import styled, { css } from 'styled-components';

import Icon from '../Icon';

type InputType = 'search' | 'text' | 'password';
type InputStatus = 'error' | 'success' | 'warning';

interface InputProps<T> {
  type?: InputType;
  value: T;
  setValue?: React.Dispatch<React.SetStateAction<T>>;
  onChangeCallback?: VoidFunction;
  onClearCallback?: VoidFunction;
  handleSearch?: () => void;
  onClick?: () => void;
  placeholder?: string;
  status?: InputStatus;
  message?: string;
}

export default function Input<T extends string | number>({
  type = 'text',
  value,
  setValue,
  onChangeCallback,
  handleSearch,
  onClick,
  placeholder,
  status,
  message,
}: InputProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue?.(e.target.value as T);
    onChangeCallback?.();
  };

  const handleClear = () => {
    if (typeof value === 'string') {
      setValue?.('' as T); // string일 때 빈 문자열로
    } else if (typeof value === 'number') {
      setValue?.(0 as T); // number일 때 0으로
    }
  };

  return (
    <InputWrapper>
      <InputContainer status={status}>
        <input
          value={value}
          onChange={handleChange}
          onClick={onClick}
          placeholder={placeholder}
          type={type}
        />
        {value && <Icon icon="Clear" width={14} height={14} onClick={handleClear} />}
        {type === 'search' && (
          <button onClick={handleSearch}>
            <Icon icon="Search" width={14} height={14} cursor="pointer" />
          </button>
        )}
      </InputContainer>
      {message && <Message status={status}>{message}</Message>}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const InputContainer = styled.div<{ status?: InputStatus }>`
  display: flex;
  align-items: center;
  width: 100%;
  border: 0.1rem solid ${({ theme }) => theme.colors.greyScale.grayScale_2};
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

  ${({ status, theme }) =>
    status &&
    css`
      border-color: ${theme.colors.secondary[status]};
    `}
`;

const Message = styled.div<{ status?: InputStatus }>`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem;
  color: ${({ theme, status }) => status && theme.colors.secondary[status]};
`;
