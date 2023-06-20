'use client';

import { Session } from 'next-auth';
import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface ProviderProps {
  children: ReactNode;
  session: Session | undefined;
}

const Provider: FC<ProviderProps> = ({ children, session }) => {
  const client = new QueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;
