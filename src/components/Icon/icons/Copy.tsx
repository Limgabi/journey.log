import { SVGProps } from 'react';

export default function Copy(props: SVGProps<SVGSVGElement>) {
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
        d="M4.66653 4.66667V2.66667C4.66653 2.29848 4.96501 2 5.3332 2H13.3332C13.7014 2 13.9999 2.29848 13.9999 2.66667V11C13.9999 11.3682 13.7014 11.6667 13.3332 11.6667H11.3332V13.6661C11.3332 14.0346 11.0333 14.3333 10.662 14.3333H2.67111C2.30039 14.3333 2 14.0369 2 13.6661L2.00173 5.33391C2.0018 4.96541 2.30176 4.66667 2.67295 4.66667H4.66653ZM3.33495 6L3.33346 13H9.99987V6H3.33495ZM5.99987 4.66667H11.3332V10.3333H12.6665V3.33333H5.99987V4.66667Z"
        fill={props.color || '#2BD9BA'}
      />
    </svg>
  );
}
