import React from 'react'
import { client } from '@/sanity/lib/client'
import { getPostbyIdQuery } from '@/lib/queries'
import { Eye } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  views: number
  category: string
  content: string
  image: string
  author: {
    name: string
    image: string
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id

  const post: Post = await client.fetch(getPostbyIdQuery, { id })

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-rose-100 to-blue-50 px-4 py-12">
      <article className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[300px] object-cover"
          />
        )}

        <div className="p-6 sm:p-10 space-y-6">
          <h1 className="text-4xl font-bold text-neutral-900">{post.title}</h1>

          <div className="flex items-center justify-between text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              {post.author?.image && (
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover border"
                />
              )}
              <span className="font-medium">{post.author?.name}</span>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> {post.views ?? 0}
              </span>
              <span className="bg-neutral-100 border px-2 py-1 rounded-full text-xs">
                {post.category}
              </span>
            </div>
          </div>

          {/* Markdown content */}
          <div className="prose max-w-none prose-neutral">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  )
}

export default Page
