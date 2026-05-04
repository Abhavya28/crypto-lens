"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Watchlist", href: "/watchlist" },
];

const Navbar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching:", query);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-700 relative">

      <div>
        <Link href="/">
          <h1 className="text-2xl font-bold">
            Crypto<span className="text-blue-400">Lens</span>
          </h1>
        </Link>
      </div>

      <div className="flex gap-6">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="hover:underline underline-offset-2 transition"
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center border border-gray-600 rounded-xl px-3 py-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coin..."
          className="bg-transparent outline-none text-sm text-white"
        />
        <button
          onClick={handleSearch}
          className="ml-2 text-blue-400 text-sm"
        >
          Search
        </button>
      </div>

    </nav>
  );
};

export default Navbar;