import { connectToDatabase } from "../../../../lib/mongodb";
import Author from "../../../models/Author";
import Blog from "../../../models/Blog";
import Image from "next/image";
import React from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

interface Params {
  params: { email: string };
}

const Page = async ({ params }: Params) => {
  const decodedEmail = decodeURIComponent(params.email);
  await connectToDatabase();
  const author = await Author.findOne({ email: decodedEmail });

  if (!author) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Author not found.</p>
      </main>
    );
  }

  const blogs = await Blog.find({ author: author._id }).sort({ createdAt: -1 });

  const getInitials = (name: string) => {
    const nameArray = name.split(' ')
    const initials =
      nameArray.length > 1
        ? nameArray[0][0] + nameArray[1][0]
        : nameArray[0][0]
    return initials.toUpperCase()
  }

  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 via-rose-50 to-yellow-50">
      {/* Author Header */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        {author.image ? (
          <Image
            src={author.image}
            alt={author.name}
            width={80}
            height={80}
            className="mx-auto rounded-full border-4 border-pink-500 object-cover"
          />
        ) : (
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-pink-500 bg-red-500 flex items-center justify-center text-white font-bold text-xl">
            {getInitials(author?.name)}
          </div>
        )}

        <h2 className="text-4xl font-bold text-pink-600 drop-shadow-sm">{author.name}</h2>
        <p className="text-neutral-700">{author.bio}</p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{author.email}</span>
        </div>
      </section>

      {/* Blog Cards or Empty State */}
      <section className="max-w-5xl mx-auto mt-10">
        {blogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog: any) => (
              <Link key={blog._id} href={`/blog/${blog.id}`}>
                <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
                  {blog.image && (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-semibold text-neutral-800">{blog.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{blog.description}</p>
                    <span className="inline-block text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full mt-2">
                      {blog.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-center py-12">
            <p className="text-lg text-gray-500">Wanna post something?</p>
            <p className="text-sm text-blue-600 mt-2">
              You can share your thoughts with the world by creating a new blog.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;