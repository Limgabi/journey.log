import { SVGProps } from 'react';

/**
 * Chevron 왼쪽부터 시작
 * @param props.params 90 180 270
 */

export default function Chevron(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_600_5552)">
        <path
          d="M15 6L9 12L15 18"
          stroke={props.color || '#202330'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_600_5552">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
