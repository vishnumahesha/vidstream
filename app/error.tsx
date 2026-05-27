'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
        <p className="text-gray-400 text-sm">{error.message}</p>
        <Button onClick={reset} className="bg-brand hover:bg-brand/90">Try again</Button>
      </div>
    </div>
  )
}
