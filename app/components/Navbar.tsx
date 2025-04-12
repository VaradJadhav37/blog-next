import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow-md border-b border-white/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/Yellow_Black_Playful_Lamp_Bulb_Idea_Company_Logo-removebg-preview.png"
            alt="The Idea Hive Logo"
            width={40}
            height={40}
            className="object-contain drop-shadow-md"
          />
          <span className="text-xl font-bold text-indigo-700 tracking-tight drop-shadow-sm">
            The Idea Hive
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {/* Home */}
          <Link href="/">
            <button className="px-4 py-2 text-sm font-medium text-gray-800 bg-white/70 border border-gray-300 rounded-full hover:bg-white/90 shadow-sm transition">
              Home
            </button>
          </Link>

          {session?.user ? (
            <>
              {/* Create Post */}
              <Link href="/startup/create">
                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-600 transition">
                  + Create Post
                </button>
              </Link>

              {/* Logout */}
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
            // Login with Google
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
      </nav>
    </header>
  );
};

export default Navbar;
