import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Author from "../../../models/Author";
import Blog from "../../../models/Blog";    

// This handles GET /api/author/[email]
export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const email = decodeURIComponent(params.email);

    await connectToDatabase();

    const author = await Author.findOne({ email });

    if (!author) {
      return NextResponse.json(
        { status: "FAILED", error: "Author not found" },
        { status: 404 }
      );
    }

    const blogs = await Blog.find({ author: author._id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { status: "SUCCESS", author, blogs },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error in GET /api/author/[email]:", error);
    return NextResponse.json(
      { status: "FAILED", error: error.message },
      { status: 500 }
    );
  }
}
