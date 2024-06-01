import styled, { CSSProperties } from 'styled-components';

import * as icons from './icons';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: keyof typeof icons;
  width?: number;
  height?: number;
  rotate?: number;
  cursor?: CSSProperties['cursor'];
}

export default function Icon({
  icon,
  cursor = 'initial',
  width = 24,
  height = 24,
  rotate,
  ...props
}: IconProps) {
  const IconComponent = icons[icon as keyof typeof icons];

  return (
    <IconContainer
      style={{
        width: width ? `${width * 0.1}rem` : '',
        height: height ? `${height * 0.1}rem` : '',
        rotate: `${rotate}deg`,
        cursor,
      }}
    >
      <IconComponent
        {...props}
        width={width && `${width * 0.1}rem`}
        height={height && `${height * 0.1}rem`}
      />
    </IconContainer>
  );
}

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
