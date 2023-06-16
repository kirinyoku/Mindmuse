'use client';

import { Session } from 'next-auth';
import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  children: ReactNode;
  session: Session | undefined;
}

const Provider: FC<ProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
