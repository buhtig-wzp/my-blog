const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'content/posts')
const outputFile = path.join(process.cwd(), 'public', 'posts.json')

if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
  fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true })
}

if (!fs.existsSync(postsDirectory)) {
  fs.writeFileSync(outputFile, '[]')
  console.log('No posts directory found, created empty posts.json')
  process.exit(0)
}

const fileNames = fs.readdirSync(postsDirectory)
const posts = fileNames
  .filter((name) => name.endsWith('.mdx'))
  .map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const wordsPerMinute = 200
    const wordCount = content.replace(/[#*`]/g, '').split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || content.slice(0, 150).replace(/[#*`]/g, '') + '...',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      readingTime: `${minutes} 分钟`,
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2))
console.log(`Generated posts.json with ${posts.length} posts`)
