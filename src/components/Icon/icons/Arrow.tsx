import { SVGProps } from 'react';

/**
 * Arrow 왼쪽부터 시작
 * @param props.params 90 180 270
 */

export default function Arrow(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_600_5529)">
				<path
					d="M19 12L5 12"
					stroke={props.color || '#202330'}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M11 18L5 12"
					stroke={props.color || '#202330'}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M11 6L5 12"
					stroke={props.color || '#202330'}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_600_5529">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}
