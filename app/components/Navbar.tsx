import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-xl font-bold text-indigo-600 tracking-tight">
            🚀 MyBlog
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {/* Home Button */}
          <Link href="/">
            <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition-all duration-200">
              Home
            </button>
          </Link>

          {session?.user ? (
            <>
              {/* Create Post */}
              <Link href="/startup/create">
                <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-500 transition-all duration-200">
                  Create Post
                </button>
              </Link>

              {/* Logout */}
              <form method="post" action="/api/auth/signout">
                <input type="hidden" name="callbackUrl" value="/" />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-red-600 bg-white border border-red-300 rounded-full shadow-sm hover:bg-red-50 transition-all duration-200"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            // Login with Google
            <form method="post" action="/api/auth/signin/google">
              <input type="hidden" name="callbackUrl" value="/" />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-full shadow-md hover:bg-gray-800 transition-all duration-200"
              >
                Login with Google
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
