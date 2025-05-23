import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "../../models/Blog";
import Author from "../../models/Author";
import slugify from "slugify";

// POST method: Create a new blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, image, category, description, content, authorId } = body;

    if (!title || !image || !category || !content || !authorId) {
      return NextResponse.json(
        { status: "FAILED", error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const author = await Author.findOne({ email: authorId });
    if (!author) {
      console.error("❌ Author not found for email:", authorId);
      return NextResponse.json(
        { status: "FAILED", error: "Author not found" },
        { status: 400 }
      );
    }

    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let suffix = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    const newPost = new Blog({
      title,
      slug,
      image,
      category,
      description,
      content,
      author: author._id,
    });

    await newPost.save();

    return NextResponse.json({ status: "SUCCESS", ...newPost._doc });
  } catch (error: unknown) {
    console.error("❌ Error in POST /api/posts:", error);
    const errMsg =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ status: "FAILED", error: errMsg }, { status: 500 });
  }
}

// GET method: Fetch all blog posts with populated author
export async function GET() {
  try {
    await connectToDatabase();

    const posts = await Blog.find({})
      .populate("author", "_id name image bio email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ status: "SUCCESS", posts }, { status: 200 });
  } catch (error: unknown) {
    console.error("❌ Error in GET /api/posts:", error);
    const errMsg =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ status: "FAILED", error: errMsg }, { status: 500 });
  }
}
