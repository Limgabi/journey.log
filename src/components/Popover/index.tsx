import { ReactNode, useCallback } from 'react';

import styled from 'styled-components';

import { useOutsideRef } from '@/hooks';

interface PopoverProps {
  trigger?: 'hover' | 'click';
  children: ReactNode;
  content: ReactNode;
}

export default function Popover({ trigger = 'hover', children, content }: PopoverProps) {
  const { ref, toggleOptions, isShowOptions, setIsShowOptions } = useOutsideRef();

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      setIsShowOptions(true);
    }
  }, [trigger, setIsShowOptions]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') {
      setIsShowOptions(false);
    }
  }, [trigger, setIsShowOptions]);

  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      toggleOptions();
    }
  }, [trigger, toggleOptions]);

  return (
    <PopoverWrapper ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <TriggerWrapper onClick={handleClick}>{children}</TriggerWrapper>
      {isShowOptions && (
        <PopoverContainer>
          <Spacing />
          <PopoverContent>{content}</PopoverContent>
        </PopoverContainer>
      )}
    </PopoverWrapper>
  );
}

const PopoverWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerWrapper = styled.div`
  cursor: pointer;
`;

const PopoverContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;

  display: flex;
  flex-direction: column;
`;

const Spacing = styled.div`
  height: 0.6rem;
`;

const PopoverContent = styled.div`
  background-color: ${({ theme }) => theme.colors.greyScale.grayScale_0};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 1.2rem;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;
