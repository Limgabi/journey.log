import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const LabelButton = styled.button`
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
