'use client'

import LoadingPage from './loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, Suspense, useState } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingPage/>}>
        {children}
      </Suspense>
    </QueryClientProvider>
  )
}
