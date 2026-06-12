'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import PostCard from '@/components/PostCard'

interface PostMeta {
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  readingTime: string
  slug: string
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [allPosts, setAllPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/posts.json')
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data)
        setPosts(data)
        setLoading(false)
      })
      .catch(() => {
        setAllPosts([])
        setPosts([])
        setLoading(false)
      })

    const params = new URLSearchParams(window.location.search)
    const q = params.get('q') || ''
    setQuery(q)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setPosts(allPosts)
      return
    }
    const lowerQuery = query.toLowerCase()
    const filtered = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
    setPosts(filtered)
  }, [query, allPosts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        搜索文章
      </h1>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键词搜索文章..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          搜索
        </button>
      </form>

      {query && (
        <p className="text-gray-600 dark:text-gray-400 mb-8 mt-4">
          {posts.length > 0
            ? `找到 ${posts.length} 篇关于 "${query}" 的文章`
            : `没有找到关于 "${query}" 的文章`}
        </p>
      )}

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          加载中...
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
