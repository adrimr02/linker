'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import superjson from 'superjson'

import { t } from './client'
import { getBaseUrl } from '@/lib/url'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() => 
    t.createClient({
      links: [
        httpBatchLink({
          url: getBaseUrl() + '/api/trpc'
        })
      ],
      transformer: superjson
    })
  )

  return (
    <t.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{ children }</QueryClientProvider>
    </t.Provider>
  )
}