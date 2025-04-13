import { connectToDatabase } from "../../../../lib/mongodb";
import Blog from "../../../models/Blog";
import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface Params {
  params: { id: string };
}

const Page = async ({ params }: Params) => {
  await connectToDatabase();
  const post = await Blog.findById(params.id).populate("author");

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Post not found.</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-rose-100 to-blue-50 px-4 py-12 space-y-12">
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-5xl font-extrabold text-pink-600 drop-shadow-sm">Explore the Story</h2>
        <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto">
          Dive deep into <span className="font-semibold">{post.title}</span>, written by{" "}
          <span className="text-pink-500 font-semibold">{post.author.name}</span>.
        </p>
      </section>

      <article className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={300}
            className="w-full h-[300px] object-cover"
          />
        )}

        <div className="p-6 sm:p-10 space-y-6">
          <h1 className="text-4xl font-bold text-neutral-900">{post.title}</h1>

          {/* Author and Category */}
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border"
                />
              )}
              <span className="font-medium">{post.author.name}</span>
            </div>
            <span className="bg-neutral-100 border px-2 py-1 rounded-full text-xs">
              {post.category}
            </span>
          </div>

          {/* ✅ Description */}
          {post.description && (
            <p className="text-lg text-neutral-700 border-l-4 border-pink-500 pl-4 italic">
              {post.description}
            </p>
          )}

          {/* Content */}
          <div className="prose max-w-none prose-neutral">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Page;
