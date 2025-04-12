'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { getAllPostsQuery } from '@/lib/queries'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search, Eye, ArrowRight } from 'lucide-react'

interface Author {
  _id: string
  name: string
  image: string
  bio: string
}

interface Blog {
  _id: string
  title: string
  slug: string
  views: number
  category: string
  content: string
  image: string
  author: Author
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const posts: Blog[] = await client.fetch(getAllPostsQuery)
        setBlogs(posts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchBlogs()
  }, [])

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-pink-600 drop-shadow-md mb-4">
          Reflect. Write. Inspire
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Explore tutorials, insights, and articles on modern web development.
        </p>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-96 px-5 py-3 border border-pink-300 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition shadow-lg">
            <Search />
          </button>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link href={`/blog/${blog._id}`} key={blog._id}>
              <Card className="group h-full flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100/50 bg-white/80 backdrop-blur-sm hover:border-pink-200 hover:bg-white">
                {blog.image && (
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}

                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    {blog.author?.image && (
                      <img
                        src={blog.author.image}
                        alt={blog.author.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-pink-200"
                      />
                    )}
                    <span className="font-medium text-sm text-gray-700">
                      {blog.author?.name}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {blog.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="w-4 h-4 text-pink-400" />
                      <span>{blog.views ?? 0} views</span>
                    </div>
                    <span className="bg-pink-100/80 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold border border-pink-200/50 group-hover:bg-pink-200/80 group-hover:border-pink-300 transition-colors">
                      {blog.category}
                    </span>
                  </div>

                  <div className="flex items-center text-sm font-medium text-pink-600 group-hover:text-pink-500 transition-colors">
                    Read more
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500">
              No blogs found matching your search.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-pink-600 hover:text-pink-700 font-medium underline"
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </main>
  )
}