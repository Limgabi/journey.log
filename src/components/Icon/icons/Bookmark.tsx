import { SVGProps } from 'react';

export default function Bookmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.28287 1H11.7171C12.19 1 12.6435 1.17384 12.9778 1.48327C13.3122 1.79271 13.5 2.21239 13.5 2.65V8.425V13.272C13.5 13.7074 13.0508 13.9979 12.6538 13.8192L8.24622 11.8358C8.08963 11.7653 7.91037 11.7653 7.75378 11.8358L3.34622 13.8192C2.94917 13.9979 2.5 13.7074 2.5 13.272V2.65C2.5 2.21239 2.68784 1.79271 3.02219 1.48327C3.35654 1.17384 3.81002 1 4.28287 1Z"
        fill={props.color || '#2BD9BA'}
      />
    </svg>
  );
}
