'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Blog {
  id: number
  title: string
  description: string
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const blogs: Blog[] = [
    {
      id: 1,
      title: 'Building a Blog with Next.js and Tailwind CSS',
      description: 'Learn how to structure a modern blog using Next.js and Tailwind for styling.',
    },
    {
      id: 2,
      title: 'Deploying Your App to Vercel',
      description: 'A guide to deploying full-stack apps using Vercel’s powerful platform.',
    },
    {
      id: 3,
      title: 'Understanding the App Router in Next.js 13+',
      description: 'Dive into Next.js’s new App Router and how it helps build scalable apps.',
    },
  ]

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="bg-neutral-100 min-h-screen px-4 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Explore tutorials, insights, and articles on modern web development.
        </p>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
          <button className="bg-neutral-900 text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition">
            Search
          </button>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Card key={blog.id} className="shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600 mb-4">{blog.description}</p>
                <Link
                  href={`/blog/${blog.id}`}
                  className="text-sm font-medium text-neutral-800 underline hover:text-neutral-600"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-neutral-500">No blogs found.</p>
        )}
      </section>
    </main>
  )
}
