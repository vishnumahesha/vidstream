import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-7xl font-bold text-brand">404</h1>
        <p className="text-gray-400">This page doesn&apos;t exist</p>
        <Button asChild className="bg-brand hover:bg-brand/90">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
