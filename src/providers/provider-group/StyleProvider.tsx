import { PropsWithChildren } from "react";

import { ThemeProvider } from "styled-components";

import StyledComponentsRegistry from "@/libs/StyledComponentsRegistry";
import { GlobalStyle } from "@/styles/global";
import theme from "@/styles/theme";

export default function StyleProvider({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
