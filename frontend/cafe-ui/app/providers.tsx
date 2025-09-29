'use client'

import LoadingPage from './loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, Suspense, useState } from 'react'
import { CartProvider } from '@/contexts/CartContext'

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
      <CartProvider>
        <Suspense fallback={<LoadingPage/>}>
          {children}
        </Suspense>
      </CartProvider>
    </QueryClientProvider>
  )
}