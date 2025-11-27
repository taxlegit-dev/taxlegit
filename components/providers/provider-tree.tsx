"use client";

import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProviderTreeProps = {
  children: ReactNode;
};

export function ProviderTree({ children }: ProviderTreeProps) {
  const [client] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

