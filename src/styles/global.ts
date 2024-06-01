'use client';

import { createGlobalStyle } from 'styled-components';

import reset from './reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    .ant-select-item-option-content {
      overflow: visible !important;
      white-space: normal !important;
      word-break: keep-all !important;
	  }
  }
  
	h1 {
		font-size: 3.2rem;
		font-weight: 700;
	}
	h2 {
		font-size: 2.4rem;
		font-weight: 700;
	}
	h3 {
		font-size: 1.8rem;
		font-weight: 500;
	}

	h4 {
		font-size: 1.6rem;
		font-weight: 500;
	}
	h5 {
		font-size: 1.4rem;
		font-weight: 400;
	}
`;
