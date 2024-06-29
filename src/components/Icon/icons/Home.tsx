import { SVGProps } from 'react';

export default function Home(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_b_556_10934)">
        <path
          d="M14.7578 4.57204L22.4001 10.971C22.8368 11.3039 23.0915 11.8588 23.0552 12.4136V22.1046C23.0552 23.1402 22.2181 23.991 21.1992 23.991H17.1031C16.6062 23.991 16.2035 23.5882 16.2035 23.0914V19.4931C16.2035 18.9963 15.8007 18.5935 15.3039 18.5935H11.7054C11.2085 18.5935 10.8058 18.9963 10.8058 19.4931V23.0914C10.8058 23.5882 10.403 23.991 9.90615 23.991H5.91458C4.89561 23.991 4.05859 23.1402 4.05859 22.1046V12.4506C4.05859 11.8588 4.31334 11.3409 4.75004 10.971L12.3923 4.57204C13.0838 3.98022 14.0664 3.98022 14.7578 4.57204Z"
          fill={props.color || '#BDBEC7'}
        />
      </g>
      <defs>
        <filter
          id="filter0_b_556_10934"
          x="-4.57759"
          y="-4.50801"
          width="36.2724"
          height="37.1352"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="4.31809" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_556_10934" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_556_10934"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
