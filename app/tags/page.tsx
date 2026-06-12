import { getAllTags } from '@/lib/posts'
import Link from 'next/link'
import { Tag } from 'lucide-react'

export const metadata = {
  title: '标签 | My Blog',
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        标签
      </h1>

      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <Tag size={16} />
            {tag}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({count})
            </span>
          </Link>
        ))}
      </div>

      {tags.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          还没有标签
        </p>
      )}
    </div>
  )
}
