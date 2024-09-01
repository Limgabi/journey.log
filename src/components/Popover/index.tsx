import { ReactNode, useCallback } from 'react';

import styled, { css } from 'styled-components';

import { useOutsideRef } from '@/hooks';

type PopoverPlacement =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom';

interface PopoverProps {
  trigger?: 'hover' | 'click';
  children: ReactNode;
  content: ReactNode;
  placement?: PopoverPlacement;
}

const commonTransform = {
  top: 'translateX(-50%)',
  left: 'translateY(-50%)',
};

const PlacementStyles: Record<PopoverPlacement, ReturnType<typeof css>> = {
  topLeft: css`
    flex-direction: column-reverse;
    bottom: 100%;
    left: 0;
  `,
  top: css`
    flex-direction: column-reverse;
    bottom: 100%;
    left: 50%;
    transform: ${commonTransform.top};
  `,
  topRight: css`
    flex-direction: column-reverse;
    bottom: 100%;
    right: 0;
  `,
  leftTop: css`
    flex-direction: row-reverse;
    right: 100%;
    top: 0;
  `,
  left: css`
    flex-direction: row-reverse;
    right: 100%;
    top: 50%;
    transform: ${commonTransform.left};
  `,
  leftBottom: css`
    flex-direction: row-reverse;
    right: 100%;
    bottom: 0;
  `,
  bottomLeft: css`
    flex-direction: column;
    top: 100%;
    left: 0;
  `,
  bottom: css`
    flex-direction: column;
    top: 100%;
    left: 50%;
    transform: ${commonTransform.top};
  `,
  bottomRight: css`
    flex-direction: column;
    top: 100%;
    right: 0;
  `,
  rightTop: css`
    left: 100%;
    top: 0;
  `,
  right: css`
    left: 100%;
    top: 50%;
    transform: ${commonTransform.left};
  `,
  rightBottom: css`
    left: 100%;
    bottom: 0;
  `,
};

export default function Popover({
  trigger = 'hover',
  children,
  content,
  placement = 'bottom',
}: PopoverProps) {
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
        <PopoverContainer placement={placement}>
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
  width: fit-content;
`;

const TriggerWrapper = styled.div`
  cursor: pointer;
`;

const PopoverContainer = styled.div<{ placement: PopoverPlacement }>`
  position: absolute;
  display: flex;

  ${({ placement }) => PlacementStyles[placement]}
`;

const Spacing = styled.div`
  width: 0.6rem;
  height: 0.6rem;
`;

const PopoverContent = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.greyScale.grayScale_0};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 1.2rem;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
`;
