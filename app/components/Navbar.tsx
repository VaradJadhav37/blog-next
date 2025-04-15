import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-rose-100/50 backdrop-blur-md shadow-md border-b border-white/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0">
            <img
              src="/Yellow_Black_Playful_Lamp_Bulb_Idea_Company_Logo-removebg-preview.png"
              alt="The Idea Hive Logo"
              width={90}
              height={50}
              className="object-contain drop-shadow-md"
            />
            <span className="text-xl font-bold text-indigo-700 tracking-tight drop-shadow-sm hidden sm:inline">
              The Idea Hive
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/">
              <button className="px-4 py-2 text-sm font-medium text-gray-800 bg-white/70 border border-gray-300 rounded-full hover:bg-white/90 shadow-sm transition">
                Home
              </button>
            </Link>

            {user ? (
              <>
                <Link href="/posts/create">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-600 transition">
                    + Create Post
                  </button>
                </Link>

                <Link href={`/users/${encodeURIComponent(user.email ?? "")}`}>
                  <div className="flex items-center gap-2 px-2">
                    {user.image ? (
                      <img
                        src={user.image}
                        loading="lazy"
                        alt={user.name || "User"}
                        className="w-9 h-9 rounded-full object-cover border border-gray-300 shadow"
                      />
                    ) : (
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-sm shadow">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                </Link>

                <form method="post" action="/api/auth/signout">
                  <input type="hidden" name="callbackUrl" value="/" />
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-white/70 border border-red-300 rounded-full hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <form method="post" action="/api/auth/signin/google">
                <input type="hidden" name="callbackUrl" value="/" />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full shadow-md hover:bg-gray-800 transition"
                >
                  Login with Google
                </button>
              </form>
            )}
          </div>

          {/* Mobile menu button */}
          <details className="md:hidden relative">
            <summary className="list-none cursor-pointer p-2">
              <Menu className="h-6 w-6 open:hidden" />
              <X className="h-6 w-6 hidden open:block" />
              <span className="sr-only">Toggle menu</span>
            </summary>

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    href="/posts/create"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Create Post
                  </Link>

                  <Link
                    href={`/users/${encodeURIComponent(user.email ?? "")}`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="w-5 h-5 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xs mr-2">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    Profile
                  </Link>

                  <form method="post" action="/api/auth/signout">
                    <input type="hidden" name="callbackUrl" value="/" />
                    <button
                      type="submit"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <form method="post" action="/api/auth/signin/google">
                  <input type="hidden" name="callbackUrl" value="/" />
                  <button
                    type="submit"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login with Google
                  </button>
                </form>
              )}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
