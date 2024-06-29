'use client';

import QueryClientProvider from './provider-group/QueryClientProvider';
import StyleProvider from './provider-group/StyleProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <StyleProvider>{children}</StyleProvider>
    </QueryClientProvider>
  );
}
