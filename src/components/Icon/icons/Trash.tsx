import { SVGProps } from 'react';

function Trash(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M4.5 6.1875H15.5"
				stroke={props.color || '#4C5061'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.625 8.9375V13.0625"
				stroke={props.color || '#4C5061'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.375 8.9375V13.0625"
				stroke={props.color || '#4C5061'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5.1875 6.1875L5.875 14.4375C5.875 14.8022 6.01987 15.1519 6.27773 15.4098C6.53559 15.6676 6.88533 15.8125 7.25 15.8125H12.75C13.1147 15.8125 13.4644 15.6676 13.7223 15.4098C13.9801 15.1519 14.125 14.8022 14.125 14.4375L14.8125 6.1875"
				stroke={props.color || '#4C5061'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7.9375 6.1875V4.125C7.9375 3.94266 8.00993 3.7678 8.13886 3.63886C8.2678 3.50993 8.44266 3.4375 8.625 3.4375H11.375C11.5573 3.4375 11.7322 3.50993 11.8611 3.63886C11.9901 3.7678 12.0625 3.94266 12.0625 4.125V6.1875"
				stroke={props.color || '#4C5061'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default Trash;
