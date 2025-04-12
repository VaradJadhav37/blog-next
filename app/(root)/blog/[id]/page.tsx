// app/blog/[id]/page.tsx
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  category: string
  content: string
  image: string
  author: {
    name: string
    image: string
  }
}

// Mock data
const mockPosts: Post[] = [
  {
    _id: "1",
    title: "Why React is Still Relevant in 2025",
    slug: { current: "react-relevance-2025" },
    category: "Web Development",
    content: `
## Introduction

React has been around for a while...

### Why It's Still Great

- Component-based architecture
- Strong ecosystem
- Backed by Meta

> React isn’t just surviving — it’s thriving.
    `,
    image: "https://source.unsplash.com/random/800x300/?react,web",
    author: {
      name: "Jane Doe",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  // Add more mock posts if needed
]

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const post = mockPosts.find((p) => p._id === id)

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Post not found.</p>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-rose-100 to-blue-50 px-4 py-12 space-y-12">
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-5xl font-extrabold text-pink-600 drop-shadow-sm">Explore the Story</h2>
        <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto">
          Dive deep into <span className="font-semibold">{post.title}</span>, written by <span className="text-pink-500 font-semibold">{post.author.name}</span>. 
          Discover insights, perspectives, and more — all wrapped in a beautifully crafted post.
        </p>
      </section>

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
              {post.author.image && (
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover border"
                />
              )}
              <span className="font-medium">{post.author.name}</span>
            </div>
            <span className="bg-neutral-100 border px-2 py-1 rounded-full text-xs">
              {post.category}
            </span>
          </div>

          <div className="prose max-w-none prose-neutral">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  )
}

export default Page
