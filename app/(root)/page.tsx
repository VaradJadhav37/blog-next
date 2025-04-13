'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Typewriter } from 'react-simple-typewriter'

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
  description: string
  image: string
  author: Author
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()
        setBlogs(data.posts || [])
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
      }
    }

    fetchBlogs()
  }, [])

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getInitials = (name: string) => {
    const nameArray = name.split(' ')
    const initials =
      nameArray.length > 1
        ? nameArray[0][0] + nameArray[1][0]
        : nameArray[0][0]
    return initials.toUpperCase()
  }

  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-pink-600 mb-4">
          <Typewriter
            words={['Reflect.', 'Write.', 'Inspire.']}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={75}
            deleteSpeed={60}
            delaySpeed={1250}
          />
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Explore tutorials, insights, and articles on modern web development.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-96 px-5 py-3 border-3 border-pink-300/50 bg-white rounded-full shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-700/50"
          />
          <button className="bg-pink-500 text-white px-6 py-3 border-3 border-pink-100/50 rounded-full hover:bg-pink-600 transition shadow-xl">
            <Search />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link href={`/blog/${blog._id}`} key={blog._id}>
              <Card className="group h-full flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-t-0 border-l-0 border-r-6 border-b-6 border-pink-600/50 bg-white/80 backdrop-blur-sm hover:border-pink-600/50 hover:bg-white hover:-translate-y-5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {blog.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-3">
                    {blog.author?.image ? (
                      <img
                        src={blog.author.image}
                        alt={blog.author.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-pink-200"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center bg-purple-500/50 text-white rounded-full">
                        {getInitials(blog.author?.name)}
                      </div>
                    )}
                    <span className="font-medium text-sm text-gray-700">
                      {blog.author?.name}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-pink-100/80 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold border border-pink-200/50 group-hover:bg-pink-200/80 group-hover:border-pink-300 transition-colors">
                      {blog.category}
                    </span>
                  </div>

                  {blog.image && (
                    <div className="relative rounded-md overflow-hidden h-48 mb-3">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  {/* Blog description */}
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {blog.description}
                  </p>

                  <Button variant="secondary" className="mt-4 w-full text-left hover:bg-pink-200/80 transition-colors color-pink-600">
                    <div className="flex items-center py-5 text-sm font-medium text-pink-600 hover:text-pink-500 transition-colors">
                      Read more
                      <ArrowRight className="ml-1 w-4 h-4 transition-transform hover:translate-x-1" />
                    </div>
                  </Button>
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
