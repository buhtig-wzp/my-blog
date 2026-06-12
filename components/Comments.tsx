'use client'

import { useTheme } from './ThemeProvider'
import { useEffect, useRef } from 'react'

interface CommentsProps {
  slug: string
  title: string
}

export default function Comments({ slug, title }: CommentsProps) {
  const { theme } = useTheme()
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!commentsRef.current) return

    const giscusAttrs = {
      src: 'https://giscus.app/client.js',
      'data-repo': 'your-username/your-repo',
      'data-repo-id': '',
      'data-category': 'Announcements',
      'data-category-id': '',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': theme === 'dark' ? 'dark' : 'light',
      'data-lang': 'zh-CN',
      crossorigin: 'anonymous',
      async: 'true',
    }

    const script = document.createElement('script')
    Object.entries(giscusAttrs).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    commentsRef.current.innerHTML = ''
    commentsRef.current.appendChild(script)
  }, [theme])

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        评论
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        评论基于 GitHub Discussions，请使用 GitHub 账号登录。
        请在 <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">components/Comments.tsx</code> 中配置你的 Giscus 仓库信息。
      </p>
      <div ref={commentsRef} />
    </section>
  )
}
