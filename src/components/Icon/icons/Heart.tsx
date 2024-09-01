import { SVGProps } from 'react';

export default function Heart(props: SVGProps<SVGSVGElement>) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8474 20.9001C11.5278 21.3496 12.4054 21.3496 13.0847 20.9001C15.2454 19.474 19.9498 16.0649 21.9766 12.2503C24.6481 7.21802 21.5108 2.19897 17.3631 2.19897C14.9992 2.19897 13.5771 3.43407 12.7905 4.4955C12.696 4.6255 12.5721 4.73129 12.4289 4.80424C12.2857 4.87719 12.1273 4.91522 11.9666 4.91522C11.8059 4.91522 11.6475 4.87719 11.5043 4.80424C11.3611 4.73129 11.2372 4.6255 11.1427 4.4955C10.356 3.43407 8.934 2.19897 6.57004 2.19897C2.42238 2.19897 -0.714922 7.21802 1.95756 12.2503C3.98235 16.0649 8.68882 19.474 10.8474 20.9001Z"
        stroke={props.color || '#BDBEC7'}
        fill={props.color || '#F6444F'}
      />
    </svg>
  );
}
