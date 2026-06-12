import { getPostsByTag } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  const { getAllTags } = await import('@/lib/posts')
  const tags = getAllTags()
  return tags.map(({ tag }) => ({ tag }))
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  return {
    title: `#${params.tag} | My Blog`,
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/tags"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        返回标签列表
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        #{params.tag}
        <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">
          ({posts.length} 篇文章)
        </span>
      </h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
