import { SVGProps } from 'react';

export default function Search(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.73 20.23L16.35 15.85C17.38 14.5 18 12.82 18 11C18 6.59 14.41 3 10 3C5.59 3 2 6.59 2 11C2 15.41 5.59 19 10 19C11.87 19 13.58 18.35 14.94 17.28L19.31 21.65C19.51 21.85 19.76 21.94 20.02 21.94C20.28 21.94 20.53 21.84 20.73 21.65C21.12 21.26 21.12 20.63 20.73 20.24V20.23ZM4.01 11C4.01 7.69 6.7 5 10.01 5C13.32 5 16.01 7.69 16.01 11C16.01 14.31 13.32 17 10.01 17C6.7 17 4.01 14.31 4.01 11Z"
        fill={props.color || '#585858'}
      />
    </svg>
  );
}
