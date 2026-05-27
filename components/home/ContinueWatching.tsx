'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSupabaseBrowser } from '@/lib/supabase/browser'
import { TMDB_IMAGE_BASE } from '@/lib/tmdb'
import { Play } from 'lucide-react'

type Row = {
  id: string
  media_type: 'movie' | 'tv'
  tmdb_id: number
  season: number | null
  episode: number | null
  progress: number
  title: string | null
  poster_path: string | null
}

export default function ContinueWatching() {
  const [items, setItems] = useState<Row[]>([])

  useEffect(() => {
    getSupabaseBrowser()
      .from('watch_progress')
      .select('id, media_type, tmdb_id, season, episode, progress, title, poster_path, updated_at')
      .gte('progress', 0.05)
      .lt('progress', 0.95)
      .order('updated_at', { ascending: false })
      .limit(10)
      .then(({ data }: { data: Row[] | null }) => setItems(data ?? []))
  }, [])

  if (items.length === 0) return null

  return (
    <section className="px-4 md:px-8 space-y-3">
      <h2 className="text-lg font-semibold text-white">Continue Watching</h2>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none">
        {items.map(item => {
          const href =
            item.media_type === 'movie'
              ? `/watch/movie/${item.tmdb_id}`
              : `/watch/tv/${item.tmdb_id}/${item.season}/${item.episode}`

          return (
            <Link key={item.id} href={href} className="snap-start flex-none w-36 md:w-44 group">
              <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-zinc-800">
                {item.poster_path && (
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w342${item.poster_path}`}
                    alt={item.title ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 144px, 176px"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-zinc-700">
                  <div className="h-full bg-brand" style={{ width: `${item.progress * 100}%` }} />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1 truncate">{item.title}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
