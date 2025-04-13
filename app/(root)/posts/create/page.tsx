"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// API call
const createPost = async (formData: FormData, content: string, authorId: string) => {
  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        image: formData.get("image"),
        category: formData.get("category"),
        description: formData.get("description"), // ✅ Include description
        authorId,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return { status: "FAILED", error: err };
  }
};

const CreatePost = () => {
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleFormSubmit = async (formData: FormData) => {
    const authorEmail = session?.user?.email;

    if (!authorEmail) {
      alert("You must be logged in to create a post.");
      return;
    }

    const result = await createPost(formData, content, authorEmail);

    if (result.status === "SUCCESS") {
      router.push(`/blog/${result._id}`);
    } else {
      alert("Failed to create post. See console for details.");
      console.error(result.error);
    }
  };

  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
      <Card className="max-w-3xl mx-auto p-6 bg-white/80 shadow-lg rounded-2xl border-pink-200/60 backdrop-blur-sm border-t-0 border-l-0 border-r-6 border-b-6 border-pink-600/50">
        <CardHeader className="mb-4">
          <CardTitle className="text-3xl text-pink-600 font-bold text-center">
            Create a New Post{" "}
            <Typewriter
              words={["..."]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={60}
              delaySpeed={650}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleFormSubmit(formData);
            }}
            className="space-y-6"
          >
            <Input name="title" placeholder="Post Title" required />
            <Input name="image" placeholder="Image URL" required />
            <Input name="category" placeholder="Category" required />

            {/* ✅ Description Field */}
            <Input name="description" placeholder="Short Description" required />

            <div data-color-mode="light">
              <label className="block font-semibold mb-2">Post Content</label>
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height={400}
                textareaProps={{
                  placeholder: "Write your post in markdown...",
                }}
                style={{ borderRadius: 12 }}
              />
            </div>

            <Button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white w-full py-3 font-semibold rounded-xl transition"
            >
              Publish Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreatePost;
