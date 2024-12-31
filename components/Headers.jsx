import Link from "next/link";
import React from "react";
import SearchInput from "./SearchInput";
import SignInOut from "./auth/SignInOut";

const Headers = ({ bg }) => {
  return (
    <nav
      className={`w-full bg-${bg} p-2 z-50 bg-gradient-to-b from-black to-transparent`}
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-red-600 text-4xl font-bold">
            MOVIE DB
          </Link>
          <div className="ml-8 space-x-4">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/compare" className="text-white hover:text-gray-300">
              Compare Movies
            </Link>

            <Link href="/watchlist" className="text-white hover:text-gray-300">
              Watch Later
            </Link>
          </div>
        </div>
        <SearchInput />
        <div className="flex items-center">
          <SignInOut/>
        </div>
      </div>
    </nav>
  );
};

export default Headers;
